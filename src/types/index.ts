import { Document, Error, Types } from 'mongoose';

export interface User extends Document {
  notificationToken: string;
  _id: Types.ObjectId;
  email: string;
  name: string;
}

export interface Notification {
  android: {
    vibrate: number[];
  };
  channelId: string;
  sound: string;
  title: string;
  body: string;
  to: string;
}

export interface Ticket {
  message: string;
  status: string;
  token: string;
  id: string;
  details?: {
    error?: 'InvalidCredentials' | 'MessageTooBig' | 'MessageRateExceeded' | 'DeviceNotRegistered' | undefined;
  };
}

export type PushResultError = {
  message: string;
  token: string;
};

export type ExpoPushResult = {
  ticketsWithErrors: PushResultError[];
  ticketsNotRegistered: string[];
};

export type InternalError = Error & { status?: number };
