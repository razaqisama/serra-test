import express from 'express';
import UserController from '../controllers/users';
import { validateRequest } from '@/middlewares/validate-request';
import { UsersValidation } from '@/models';

const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/', validateRequest(UsersValidation.create()), UserController.createUser);
router.delete('/:id', validateRequest(UsersValidation.deleteParams()), UserController.createUser);

export default router;