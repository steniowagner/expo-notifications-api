import { NextFunction, Request, Response } from 'express';
import { InternalError } from '../types';

const routeNotFound = (_req: Request, _res: Response, next: NextFunction): void => {
  const err: InternalError = new Error('Route not found');

  err.status = 404;

  next(err);
};

export default routeNotFound;
