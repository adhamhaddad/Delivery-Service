import { Router } from 'express';
import {
  validateGetUser,
  validateUpdateUser,
  validateDeleteUser
} from '../../middlewares/validation/users';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../../controllers/users';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router
  .get('/', verifyToken, getUsers)
  .get('/:id', validateGetUser, verifyToken, getUser)
  .patch('/:id', validateUpdateUser, verifyToken, updateUser)
  .delete('/:id', validateDeleteUser, verifyToken, deleteUser);

export default router;
