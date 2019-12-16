import { NextFunction } from 'express';

import { InternalError } from '../../types';

type Err = InternalError & { errors?: object };

const getErrorStatusCode = (err: Err): number => {
  if (!err.errors) {
    return 500;
  }

  return 400;
};

const handleControllerError = (err: Err, next: NextFunction): void => {
  err.status = getErrorStatusCode(err);

  next(err);
};

export default handleControllerError;
