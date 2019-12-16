import { ExpoPushReceipt } from 'expo-server-sdk';

import { Ticket, ExpoPushResult } from '../../types';
import CONSTANTS from '../../constants';

const getErrorsFromProviders = (allReceipts: ExpoPushReceipt[]): ExpoPushResult => {
  const ticketsNotRegistered = [];
  const ticketsWithErrors = [];

  const receipts = (allReceipts as unknown) as Ticket[];

  const receiptsWithError = receipts.filter(
    receipt => receipt.status === CONSTANTS.ERROR_MESSAGES.PUSH_NOTIFICATION_ERROR,
  );

  for (let i = 0; i < receiptsWithError.length; i++) {
    const { token, details, message } = receiptsWithError[i];

    if (details?.error === CONSTANTS.ERROR_MESSAGES.DEVICE_NOT_REGISTERED) {
      ticketsNotRegistered.push(token);
    } else {
      ticketsWithErrors.push({
        message,
        token,
      });
    }
  }

  return {
    ticketsNotRegistered,
    ticketsWithErrors,
  };
};

export default getErrorsFromProviders;
