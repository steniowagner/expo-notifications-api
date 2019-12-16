import { Expo } from 'expo-server-sdk';
import { Document } from 'mongoose';

import { User } from '../../types';

const getValidTokens = (inputTokens: string[], allUsers: Document[]): string[] => {
  const nonRepeatedInputTokens = [...new Set(inputTokens)];

  const users = (allUsers as unknown) as User[];
  const recordedTokens = users.map(user => user.notificationToken);

  const validTokens = nonRepeatedInputTokens.filter(nonRepeatedInputToken => {
    const isTokenRecordedDatabase = recordedTokens.includes(nonRepeatedInputToken);
    const isValidExpoToken = Expo.isExpoPushToken(nonRepeatedInputToken);

    return isTokenRecordedDatabase && isValidExpoToken;
  });

  return validTokens;
};

export default getValidTokens;
