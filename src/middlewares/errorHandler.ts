import { NextFunction, Request, Response } from 'express';
import { InternalError } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: InternalError, _req: Request, res: Response, _next: NextFunction): Response => {
  const message = err.message || 'Route not found.';

  return res.status(err.status || 404).send({ message });
};

export default errorHandler;
