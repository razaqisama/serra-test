import express from 'express';
import UserController from '../controllers/users';
import { validateRequest } from '../middlewares/validate-request';
import { UsersValidation } from '../models';
import { validateParams } from '../middlewares/validate-params';

const router = express.Router();

router.get('/', UserController.getUsers);
router.post('/', 
  validateRequest(UsersValidation.create()), 
  UserController.createUser
);
router.put('/:id', 
  validateParams(UsersValidation.updateParams()), 
  validateRequest(UsersValidation.update()),
  UserController.updateUser,
);
router.delete('/:id', 
  validateParams(UsersValidation.deleteParams()), 
  UserController.deleteUser
);

export default router;