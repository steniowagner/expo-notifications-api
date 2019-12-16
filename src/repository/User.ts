import { Document, Types } from 'mongoose';

import UserModel from '../models/User';
import { User } from '../types';

const validateId = (id: string): boolean => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('id invalid.');
  }

  return true;
};

const create = async (data: User): Promise<Document> => {
  try {
    const user = new UserModel(data);
    return user.save();
  } catch (err) {
    throw err;
  }
};

const read = async (): Promise<Document[]> => {
  try {
    return UserModel.find();
  } catch (err) {
    throw err;
  }
};

const readOne = async (id: string): Promise<Document | null> => {
  try {
    validateId(id);

    return UserModel.findById(id);
  } catch (err) {
    throw err;
  }
};

const update = async (id: string, data: User): Promise<Document | null> => {
  try {
    validateId(id);

    return await UserModel.findByIdAndUpdate(id, { $set: data }, { new: true });
  } catch (err) {
    throw err;
  }
};

const remove = async (id: string): Promise<Document | null> => {
  try {
    validateId(id);

    return await UserModel.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

export default {
  create,
  read,
  readOne,
  update,
  delete: remove,
};
