import UserRoute from './user-routes';
import express from 'express';

const router = express.Router();

router.use('/users', UserRoute);

export default router;
