import { ExpoPushTicket } from 'expo-server-sdk';

import { Ticket, ExpoPushResult } from '../../types';
import CONSTANTS from '../../constants';

const getErrorMessage = (error: string): string => {
  switch (error) {
    case CONSTANTS.ERROR_MESSAGES.NOTIFICATION_PAYLOAD_TOO_LARGE:
      return 'Notification data size exceeded allowed limit (4096 bytes).';

    case CONSTANTS.ERROR_MESSAGES.NOTIFICATION_RATE_EXCEEDED:
      return 'Too many notifications have been sent to this device in a short time. Try again later.';

    case CONSTANTS.ERROR_MESSAGES.INVALID_NOTIFICATION_CREDENTIALS:
      return 'Invalid notification push credentials.';

    default:
      return 'Unknown error.';
  }
};

const getPushResultsFromExpo = (allTickets: ExpoPushTicket[]): ExpoPushResult & { validTickets: Ticket[] } => {
  const ticketsNotRegistered = [];
  const ticketsWithErrors = [];
  const validTickets = [];

  const tickets = (allTickets as unknown) as Ticket[];

  for (let i = 0; i < tickets.length; i++) {
    const { status, token, details } = tickets[i];

    const hasError = status === CONSTANTS.ERROR_MESSAGES.PUSH_NOTIFICATION_ERROR;

    if (!hasError) {
      validTickets.push(tickets[i]);

      continue;
    }

    const isDeviceNotRegistered = details && details.error === CONSTANTS.ERROR_MESSAGES.DEVICE_NOT_REGISTERED;

    if (isDeviceNotRegistered) {
      ticketsNotRegistered.push(token);

      continue;
    }

    const message = details && details.error ? getErrorMessage(details.error) : 'Unknown error.';

    ticketsWithErrors.push({
      message,
      token,
    });
  }

  return {
    ticketsNotRegistered,
    ticketsWithErrors,
    validTickets,
  };
};

export default getPushResultsFromExpo;
