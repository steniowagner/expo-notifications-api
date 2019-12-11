import { NextFunction, Request, Response } from 'express';

const setHeader = (_req: Request, res: Response, next: NextFunction): void => {
  res.header('Access-Control-Allow-Origin', '*');

  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  next();
};

export default setHeader;
