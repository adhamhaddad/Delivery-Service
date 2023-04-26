import { Router } from 'express';
import {
  validateCreateParcel,
  validateGetParcel,
  validateUpdateParcel,
  validateDeleteParcel
} from '../../middlewares/validation/parcels';
import {
  createParcel,
  getParcels,
  getParcel,
  updateParcel,
  deleteParcel
} from '../../controllers/parcels';
import { verifyToken } from '../../middlewares/verifyToken';
import { verifySender } from '../../middlewares/verifyUser';

const router = Router();

router
  .post('/', validateCreateParcel, verifyToken, verifySender, createParcel)
  .get('/', verifyToken, getParcels)
  .get('/:id', validateGetParcel, verifyToken, getParcel)
  .patch('/:id', validateUpdateParcel, verifyToken, verifySender, updateParcel)
  .delete(
    '/:id',
    validateDeleteParcel,
    verifyToken,
    verifySender,
    deleteParcel
  );

export default router;
