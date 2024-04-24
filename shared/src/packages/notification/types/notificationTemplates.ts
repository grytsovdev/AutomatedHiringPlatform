import { TimecardStatus } from 'timecard-status';

export const notificationTemplateBooking = (name: string, status: string) =>
  `Your booking ${name} changed status: ${status}`;

export const notificationTemplateTimecard = (name: string, status: TimecardStatus) =>
  `Your timecard ${name} changed status: ${status}`;

export const notificationTemplatePasswordChange = () =>
  `Your password has been changed successfully`;

export const bookingNewUserNotify = (bookingName: string) =>
  `Booking ${bookingName} have new applicants`;
export const messageNewNotification = (chatName: string) => `New message in chat ${chatName}`;
export const paymentApproveNotification = (userName: string) => `${userName} approved his payment`;
export const successPaymentNotification = (bookingName: string) =>
  `Your payment for booking ${bookingName} is success`;
