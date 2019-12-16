import { ExpoPushMessage, ExpoPushToken } from 'expo-server-sdk';

import CONSTANTS from '../../constants';

const buildNotifications = (tokens: ExpoPushToken[], body: string, title: string): ExpoPushMessage[] => {
  const notifications = tokens.map(token => ({
    channelId: CONSTANTS.VALUES.NOTIFICATIONS_CHANNEL,
    to: token,
    title,
    body,
  }));

  return notifications;
};

export default buildNotifications;
