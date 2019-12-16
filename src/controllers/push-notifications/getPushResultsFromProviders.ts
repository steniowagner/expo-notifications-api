import { Expo, ExpoPushReceipt } from 'expo-server-sdk';

import CONSTANTS from '../../constants';
import { Ticket } from '../../types';

const getPushResultsFromProvider = async (expo: Expo, tickets: Ticket[]): Promise<ExpoPushReceipt[]> => {
  const receiptsIds = tickets.map(ticket => ticket.id);
  const receiptChunks = expo.chunkPushNotificationReceiptIds(receiptsIds);

  const ticketsWithError = [];

  for (const receiptChunk of receiptChunks) {
    const receipts = await expo.getPushNotificationReceiptsAsync(receiptChunk);

    const receiptsArray = Object.keys(receipts).map(receipt => ({
      ...receipts[receipt],
      receipt,
    }));

    const receiptsWithError = receiptsArray.filter(
      ({ status }) => status === CONSTANTS.ERROR_MESSAGES.PUSH_NOTIFICATION_ERROR,
    );

    ticketsWithError.push(...receiptsWithError);
  }

  return ticketsWithError;
};

export default getPushResultsFromProvider;
