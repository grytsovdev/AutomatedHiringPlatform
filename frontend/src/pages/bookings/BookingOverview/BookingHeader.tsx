import React, { useState } from 'react';
import styles from './BookingOverview.module.css';
import { Button } from '../../../common/components/ui/common/Button';
import { useAddUserToBookingMutation } from 'src/common/store/api/packages/bookings/bookingApi';
import { useToast } from '../../../common/components/ui/common/Toast/useToast';
import { useAppSelector } from 'src/common/hooks/redux';
import { Booking } from 'src/common/packages/booking/types/models/Booking.model';
import { User } from 'src/common/packages/user/types/models/User.model';

import { selectUserId } from '../../../common/store/slices/packages/user/userSelectors';
import { useCreateBookingEventMutation } from 'src/common/store/api/packages/calendar/calendarApi';
import PDFFileInput from 'src/common/components/ui/common/PDFInput/PDFFileInput';

interface BookingHeaderProps {
  facility: string;
  booking: Booking;
  users: User[];
}

const BookingHeader: React.FC<BookingHeaderProps> = ({ facility, booking, users }) => {
  const userId = useAppSelector(selectUserId);
  const { toast } = useToast();

  const [addUserToBooking] = useAddUserToBookingMutation();

  const [createEvent] = useCreateBookingEventMutation();

  const [isApplying, setIsApplying] = useState(false);

  const [isFinished, setIsFinished] = useState(false);

  const userExists = users.some((user: { id: number }) => user.id === userId);

  const handleApplyClick = async () => {
    try {
      await addUserToBooking({ bookingId: booking.id, userId });
      await createEvent({ bookingId: booking.id, userId });
      toast({
        variant: 'default',
        title: 'Success',
        description: 'User has been successfully added to the booking.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while adding the user.',
      });
    }
  };

  return (
    <div className={styles.bookingHeader}>
      <div className={styles.jobTitle}>{facility}</div>
      {isApplying && (
        <PDFFileInput
          handleClick={() => {
            setIsApplying(false);
            setIsFinished(true);
          }}
        ></PDFFileInput>
      )}
      {!isApplying && !isFinished && <Button onClick={() => setIsApplying(true)}>Apply</Button>}
      {isFinished && (
        <p className='text-body-large text-green-2'>You are 95% match for this job description</p>
      )}
    </div>
  );
};

export default BookingHeader;
