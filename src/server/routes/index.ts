import * as express from 'express';
import apiRoutes from './api';
import authRoute from './auth';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/api', apiRoutes);

export default router;