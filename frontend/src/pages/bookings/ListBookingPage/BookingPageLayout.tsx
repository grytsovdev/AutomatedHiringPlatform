import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { BookingFiltersDto } from 'src/common/packages/booking/types/dto/BookingFiltersDto';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { Button } from 'src/common/components/ui/common/Button';
import { hasPermissions } from 'src/common/helpers/authorization/hasPermissions';
import { User } from 'src/common/packages/user/types/models/User.model';
import { useAppDispatch, useAppSelector } from '../../../common/hooks/redux';
import { exportCSV } from '../../../common/store/slices/packages/export-csv/exportCSVSlice';
import { cn } from 'src/common/helpers/helpers';
import { ReactComponent as ExportIcon } from 'src/assets/icons/export.svg';
import { ReactComponent as AddIcon } from 'src/assets/icons/add.svg';
import { RefreshButton } from '../../../common/components/ui/common/Button/common/refresh-button/RefreshButton';

const LIMIT = 6;

const BookingPageLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const user = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  const isCSVLoading = useAppSelector(state => state.exportCSV.isLoading);

  const location = useLocation();

  const filters: BookingFiltersDto = {
    facilityId: searchParams.get('facility'),
    endDate: searchParams.get('endDate'),
    startDate: searchParams.get('startDate'),
    status: searchParams.get('status'),
    limit: LIMIT,
    offset: Number(searchParams.get('offset')),
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof BookingFiltersDto] === null &&
      delete filters[key as keyof BookingFiltersDto];
  });

  const handleExportCSV = () => {
    dispatch(exportCSV({ feature: 'booking', filters }));
  };

  useEffect(() => {
    setSearchParams('');
  }, []);

  console.log(user.role);
  console.log(user.permissions);

  return (
    <>
      <Header title='Jobs'>
        {user.permissions && hasPermissions(['manageBookings'], user as User) && (
          <div className='flex flex-1 justify-end'>
            <div className='flex gap-x-4 mr-[-22px]'>
              <Button
                variant='secondary'
                onClick={handleExportCSV}
                disabled={isCSVLoading}
                className='px-[16px] md:px-[32px]'
              >
                <span className='hidden md:inline'>
                  {isCSVLoading ? 'Exporting...' : 'Export CSV'}
                </span>
                <ExportIcon className='md:hidden w-4 h-4' />
              </Button>
              <Link to='create'>
                <Button variant='primary' className='px-[16px] md:px-[32px]'>
                  <span className='hidden md:inline'>Create new job application</span>
                  <AddIcon className='md:hidden w-6 h-6' />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Header>
      <div className='container max-w-[1080px] px-4 sm:px-6 lg:px-8 flex justify-center flex-col mx-auto mt-10 mb-10'>
        <div className='flex items-center justify-between'>
          <h5 className='text-2xl leading-6 font-semibold text-dark-grey'>Jobs</h5>
          <RefreshButton />
        </div>
        {user.role && user.role.label === 'PLATFORM_ADMIN' && (
          <div className='flex gap-4 text-dark-grey font-medium my-6'>
            <Link
              to='/booking'
              className={cn({
                'text-blue underline underline-offset-8': location.pathname === '/booking',
              })}
            >
              All jobs
            </Link>

            <Link
              to='/booking/yourjobs'
              className={cn({
                'text-blue underline underline-offset-8':
                  location.pathname === '/booking/interview',
              })}
            >
              Created by you
            </Link>
          </div>
        )}

        <Outlet />
      </div>
    </>
  );
};

export default BookingPageLayout;
