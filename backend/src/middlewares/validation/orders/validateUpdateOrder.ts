import { Request, Response, NextFunction } from 'express';
import { check, body } from 'express-validator';
import { validate } from '../validationResult';

export const validateUpdateOrder = [
  check('id')
    .exists()
    .withMessage('id is missing from the parameters')
    .notEmpty()
    .withMessage('id is empty'),
  body('biker_id')
    .exists()
    .withMessage('biker_id is missing from the body')
    .notEmpty()
    .withMessage('biker_id is empty')
    .isNumeric()
    .withMessage('biker_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
