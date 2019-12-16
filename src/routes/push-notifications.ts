import { Router } from 'express';

import PushNotificationsController from '../controllers/push-notifications';

const router = Router();

router.post('/', PushNotificationsController.send);

export default router;
