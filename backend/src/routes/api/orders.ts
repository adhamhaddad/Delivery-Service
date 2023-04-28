import { Router } from 'express';
import {
  validateCreateOrder,
  validateGetOrders,
  validateGetOrder,
  validateUpdateOrder,
  validateDeleteOrder
} from '../../middlewares/validation/orders';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder
} from '../../controllers/orders';
import { verifyToken } from '../../middlewares/verifyToken';
import { verifyBiker } from '../../middlewares/verifyUser';

const router = Router();

router
  .post('/', validateCreateOrder, verifyToken, verifyBiker, createOrder)
  .get('/:id', validateGetOrders, verifyToken, verifyBiker, getOrders)
  // .get('/:id', validateGetOrder, verifyToken, verifyBiker, getOrder)
  .patch('/:id', validateUpdateOrder, verifyToken, verifyBiker, updateOrder)
  .delete('/:id', validateDeleteOrder, verifyToken, verifyBiker, deleteOrder);

export default router;
