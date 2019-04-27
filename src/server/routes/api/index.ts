import * as express from 'express';
import bookRoutes from './books';

const router = express.Router();

router.use('/books', bookRoutes);

export default router;
