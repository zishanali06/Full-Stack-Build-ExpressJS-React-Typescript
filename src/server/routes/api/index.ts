import * as express from 'express';
import bookRoutes from './books';
import catRoutes from './categories';

const router = express.Router();

router.use('/books', bookRoutes);
router.use('/cat', catRoutes);

export default router;
