import { ReactComponent as Booking } from 'src/assets/icons/booking.svg';
import { ReactComponent as Profile } from 'src/assets/icons/profile.svg';
import { ReactComponent as Message } from 'src/assets/icons/message.svg';
import { ReactComponent as Payment } from 'src/assets/icons/payment.svg';
import { ReactComponent as Calendar } from 'src/assets/icons/calendar.svg';
import { NavItem } from '../types/NavItem';
import { UserCog, BarChart3 } from 'lucide-react';

export const routerConfig = {
  name: 'Fyrst',
  description: '',
  url: '',
  mainNav: [
    {
      title: 'Jobs',
      icon: Booking,
      mainPath: '/booking',
      path: '/booking',
      items: [
        {
          title: 'Create job',
          path: '/booking/create',
          isPrivate: true,
          neededPermission: 'manageBookings',
        },
      ],
    },

    {
      title: 'Profile',
      icon: Profile,
      mainPath: '/profile',
      path: '/profile/edit',
      items: [
        {
          title: 'Edit profile',
          path: '/profile/edit',
        },
        {
          title: 'Portfolio',
          path: '/profile/portfolio',
        },
        {
          title: 'Notifications',
          path: '/profile/notifications',
        },
        {
          title: 'Security',
          path: '/profile/security',
        },
      ],
    },
    {
      title: 'Users',
      icon: UserCog,
      mainPath: '/users',
      path: '/users',
      items: [],
      isPrivate: true,
      neededPermission: 'manageUsers',
    },
    {
      title: 'Reports',
      icon: BarChart3,
      mainPath: '/reports',
      path: '/reports',
      items: [],
      isPrivate: true,
      neededRoles: ['FACILITY_MANAGER'],
    },
    { title: 'Calendar', icon: Calendar, mainPath: '/calendar', path: '/calendar', items: [] },
  ] as NavItem[],
};
