import { Router } from 'express';
import { auth, users, emails, phones, parcels, orders } from './api';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/emails', emails);
router.use('/phones', phones);
router.use('/parcels', parcels);
router.use('/orders', orders);

export default router;
