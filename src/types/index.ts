import { Error } from 'mongoose';

export interface User {
  notificationToken: string;
  email: string;
  name: string;
}

export type InternalError = Error & { status?: number };
