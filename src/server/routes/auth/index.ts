import * as express from 'express';
import loginRoute from './login';
import regRoute from './register';

const router = express.Router();

router.use('/login', loginRoute);
router.use('/register', regRoute);

export default router;
