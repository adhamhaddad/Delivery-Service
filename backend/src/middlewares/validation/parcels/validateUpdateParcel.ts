import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateParcel = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('pick_up_address')
    .exists()
    .withMessage("pick_up_address does'nt exists in the body.")
    .notEmpty()
    .withMessage('pick_up_address is empty')
    .isString()
    .isLength({ min: 5, max: 200 })
    .withMessage('pick_up_address must be at least 5 and maximum 200 letters'),
  body('drop_off_address')
    .exists()
    .withMessage("drop_off_address does'nt exists in the body.")
    .notEmpty()
    .withMessage('drop_off_address is empty')
    .isString()
    .isLength({ min: 5, max: 200 })
    .withMessage('drop_off_address must be at least 5 and maximum 200 letters'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
