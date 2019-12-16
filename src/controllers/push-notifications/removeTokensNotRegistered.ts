import { Document } from 'mongoose';

import UserRepository from '../../repository/User';
import { User } from '../../types';

const removeTokensNotRegistered = async (
  tokensNotRegistered: string[],
  allUsers: Document[],
): Promise<(Document | null)[]> => {
  const users = (allUsers as unknown) as User[];

  const usersToRemove = users.filter(user => tokensNotRegistered.includes(user.notificationToken));

  return Promise.all(usersToRemove.map(async ({ _id }) => UserRepository.delete(_id.toHexString())));
};

export default removeTokensNotRegistered;
