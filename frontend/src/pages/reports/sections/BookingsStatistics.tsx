import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useFetchBookingsAmountStatisticsQuery } from 'src/common/store/api/packages/statistics/statisticsApi';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { SectionHeader } from '../common/SectionHeader';

ChartJS.register(ArcElement, Tooltip, Legend);

export function BookingStatistics({
  facilityId,
  startDate,
}: {
  facilityId: number;
  startDate: Date;
}) {
  const {
    data: stats,
    isFetching: isStatsFetching,
    isError: isStatsError,
  } = useFetchBookingsAmountStatisticsQuery({
    facilityId: String(facilityId),
    startDate: String(startDate),
  });

  if (isStatsError) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: "Can't fetch booking amount statistics",
    });
  }

  if (isStatsFetching || !stats) {
    return (
      <div className='min-h-[35vh] flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const chartData = {
    labels: ['Completed', 'Pending', 'Rejected'],
    datasets: [
      {
        label: '# of Votes',
        data: [stats.completed, stats.pending, stats.rejected],
        backgroundColor: ['rgb(38, 196, 133)', 'rgb(8, 61, 119)', 'rgb(187, 17, 40)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: true },
    },
  };

  return (
    <section className='grid md:grid-cols-3 grid-cols-1 mb-6'>
      <div className='md:col-span-2'>
        <SectionHeader>Amount of bookings</SectionHeader>
        <p className='text-body-large'>
          During the last year, your company submitted total of{' '}
          <span className='underline'>{stats.total}</span> bookings.{' '}
          <span className='underline'>{stats.completed}</span> of them were completed,{' '}
          <span className='underline'>{stats.rejected}</span> of them were rejected and{' '}
          <span className='underline'>{stats.pending}</span> of them are still pending.
        </p>
      </div>
      <div className='mt-6 md:mt-0 md:col-span-1 flex flex-col items-center justify-center'>
        <div className='max-h-[30vh]'>
          <Pie data={chartData} options={chartOptions} />
        </div>
        <span className='mt-2 text-grey'>Completed to pending ratio</span>
      </div>
    </section>
  );
}
