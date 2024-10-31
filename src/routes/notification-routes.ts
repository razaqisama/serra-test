import { validateRequest } from '../middlewares/validate-request';
import { NotificationValidation } from '../models';
import NotificatioNController from '../controllers/notifications';
import express from 'express';

const router = express.Router();

router.post('/', 
  validateRequest(NotificationValidation.create()), 
  NotificatioNController.createNotification,
);

export default router;