import UserRoute from './user-routes';
import NotificationRoute from './notification-routes';
import express from 'express';

const router = express.Router();

router.use('/users', UserRoute);
router.use("/notifications", NotificationRoute);

export default router;
