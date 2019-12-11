import { Router } from 'express';

import UserController from '../controllers/User';

const router = Router();

router.post('/', UserController.create);
router.get('/', UserController.read);
router.get('/:id', UserController.readOne);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export default router;
