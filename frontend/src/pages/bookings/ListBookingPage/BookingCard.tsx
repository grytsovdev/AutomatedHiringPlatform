import React from 'react';
import { ReactComponent as ClockIcon } from 'src/assets/icons/clock.svg';
import { ReactComponent as CalendrIcon } from 'src/assets/icons/calendar.svg';
import { ReactComponent as ProfileIcon } from 'src/assets/icons/profile.svg';

import { Card } from 'src/common/components/ui/common/Card/Card';
import { Booking } from 'src/common/packages/booking/types/models/Booking.model';
import { Link } from 'react-router-dom';
import { useFormattedDate } from '../../../common/hooks/use-formatted-date/useFormattedDate.hook';

interface BookingCardProps {
  booking: Booking;
}

type StatusClassMap = {
  pending: string;
  accepted: string;
  rejected: string;
  canceled: string;
  completed: string;
};

export const BookingCard = ({ booking }: BookingCardProps) => {
  const statusClassMap: StatusClassMap = {
    pending: 'bg-[#65ABF6] text-dark-blue',
    accepted: 'bg-[#A7E9F1] text-green',
    rejected: 'bg-[#F8B6B4] text-red-2',
    canceled: 'bg-[#F3F4F6] text-grey',
    completed: 'bg-[#BAF2DC] text-green-2',
  };

  const statusClass = statusClassMap[booking.status as keyof StatusClassMap];
  const createdAt = useFormattedDate({
    dateString: booking.createdAt,
    format: 'dot',
  });

  const startDate = useFormattedDate({
    dateString: new Date(booking.startDate),
    format: 'dash',
    locale: 'fr-CA',
  });
  const endDate = useFormattedDate({
    dateString: new Date(booking.endDate),
    format: 'dash',
    locale: 'fr-CA',
  });

  const fullNames = booking.users.map(user => `${user.first_name} ${user.last_name}`).join(', ');

  return (
    <Card className='px-4 py-4 flex-1 flex justify-between'>
      <Link to={`/booking/${booking.id}`}>
        <div className=' flex flex-col gap-4 w-[280px] '>
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
            <p className='h-[100px] text-ellipsis overflow-hidden w-full'>{booking.notes}</p>
          </div>
        </div>
      </Link>
    </Card>
  );
};
