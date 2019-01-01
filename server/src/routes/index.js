import { Router } from 'express';
import chirpRouter from './chirps';

let router = Router();

router.use('/chirps', chirpRouter);

export default router;