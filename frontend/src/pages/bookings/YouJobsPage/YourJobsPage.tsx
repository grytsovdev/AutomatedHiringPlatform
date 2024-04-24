import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Pagination } from 'src/common/components/ui/common/Pagination/Pagination';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { BookingFiltersDto } from 'src/common/packages/booking/types/dto/BookingFiltersDto';
import { useGetAllBookingsQuery } from 'src/common/store/api/packages/bookings/bookingApi';
import { BookingCard } from '../ListBookingPage/BookingCard';
import { BookingFilters } from '../ListBookingPage/BookingFilters';
import { useAppSelector } from 'src/common/hooks/redux';
import { Card } from 'src/common/components/ui/common/Card/Card';

const LIMIT = 6;

export const YourJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const user = useAppSelector(state => state.user);

  const filters: BookingFiltersDto = {
    facilityId: searchParams.get('facility'),
    endDate: searchParams.get('endDate'),
    startDate: searchParams.get('startDate'),
    status: searchParams.get('status'),
    limit: LIMIT,
    offset: (currentPage - 1) * LIMIT,
  };

  Object.keys(filters).forEach(key => {
    filters[key as keyof BookingFiltersDto] === null &&
      delete filters[key as keyof BookingFiltersDto];
  });

  const { data, isFetching } = useGetAllBookingsQuery(filters);

  const userBookings = data?.bookings.filter(booking => booking.createdBy === user.id);

  let totalPages = 0;
  if (data) totalPages = Math.ceil(data.total / LIMIT);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(prevParams => {
      if (e.target.value === '' || parseInt(e.target.value) === 0) {
        console.log('Target', e.target.name);
        prevParams.delete(e.target.name);
      } else {
        prevParams.set(e.target.name, e.target.value);
      }

      setCurrentPage(1);
      return prevParams;
    });
  }

  useEffect(() => {
    setSearchParams('');
  }, []);

  return (
    <>
      {isFetching ? (
        <div className='flex justify-center min-h-[8rem]'>
          <Spinner size='lg' />
        </div>
      ) : userBookings?.length === 0 ? (
        <p className='text-body-default font-semibold mt-10'>
          No bookings to display here. Most probably, nothing matches your search query
        </p>
      ) : (
        <div className='mt-6'>
          <div className='flex gap-9 mb-8 flex-wrap items-stretch'>
            {userBookings?.map((booking, i) => (
              <Card key={i} className='px-4 py-4 flex-1 flex justify-between'>
                <Link to={`/booking/candidates`}>
                  <div className=' flex flex-col gap-4 w-[980px] '>
                    <div className='flex justify-between items-center'>
                      <div className={`h-7 leading-6 font-semibold text-3xl text-blue`}>
                        {booking.position}
                      </div>
                      <p className='h-5 leading-5 font-semibold text-sm text-dark-grey'>
                        ${booking.pricePerHour}
                      </p>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <h5 className='text-xl leading-6 font-semibold text-black truncate'>
                        {booking.companyName}
                      </h5>
                    </div>
                    <div className='flex flex-col gap-4 h-full justify-end'>
                      <p className='h-[100px] text-ellipsis overflow-hidden w-full'>
                        {booking.notes}
                      </p>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
