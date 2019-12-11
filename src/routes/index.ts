import express, { Request, Response } from 'express';

import userRoutes from '../routes/user';

const router = express.Router();

router.get(
  '/',
  (_req: Request, res: Response): Response =>
    res.status(200).send({
      message: 'UHUL! The API is UP && RUNNING!!!',
    }),
);

router.use('/users', userRoutes);

export default router;
