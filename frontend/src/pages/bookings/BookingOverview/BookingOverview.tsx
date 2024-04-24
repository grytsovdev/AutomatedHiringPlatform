import React from 'react';
import styles from './BookingOverview.module.css';
import BookingHeader from './BookingHeader';
import BookingDescription from './BookingDescription';
import AdditionalDetails from './AdditionalDetails';
import StatusCard from './StatusCard';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookingByIdQuery } from 'src/common/store/api/packages/bookings/bookingApi';
import { Header } from '../../../common/components/ui/layout/Header/Header';
import { GoBackButton } from '../../../common/components/ui/common/Button/common/go-back-button/GoBackButton';
import { useToast } from '../../../common/components/ui/common/Toast/useToast';
import { Spinner } from '../../../common/components/ui/common/Spinner/Spinner';
import { useFormattedDate } from 'src/common/hooks/use-formatted-date/useFormattedDate.hook';
import { useAppSelector } from 'src/common/hooks/redux';
import { selectUser } from '../../../common/store/slices/packages/user/userSelectors';

const BookingOverview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const user = useAppSelector(selectUser);

  const { data: booking, isLoading, isError } = useGetBookingByIdQuery(Number(id));

  const numOfPeopleReceived = booking?.users ? booking.users.length : 0;

  const createdAt = useFormattedDate({ dateString: String(booking?.createdAt), format: 'dash' });
  const startDate = useFormattedDate({ dateString: String(booking?.startDate), format: 'dot' });
  const endDate = useFormattedDate({ dateString: String(booking?.endDate), format: 'dot' });

  if (isLoading || !booking || !user) {
    return (
      <div className='min-h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (isError) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'An error occurred while fetching booking data.',
    });

    navigate('/booking');
    return null;
  }

  return (
    <>
      <Header title='Job overview' />
      <div className={styles.bookingContainer}>
        <GoBackButton path='/booking' className='text-dark-grey'>
          All jobs
        </GoBackButton>
        <BookingHeader facility={booking.companyName} booking={booking} users={booking.users} />
        <div className={styles.bookingBody}>
          <BookingDescription description={booking.notes} />
          <div className={styles.detailsAndStatusContainer}>
            <AdditionalDetails
              data={{
                companyName: booking.companyName,
                createdAt,
                position: booking.position,
                englishLevel: booking.englishLevel,
                degree: booking.education,
                experience: booking.experience,

                skills: booking.skills ? booking.skills.join(', ') : '',
              }}
            />
            <StatusCard applicantsCount={numOfPeopleReceived} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingOverview;
