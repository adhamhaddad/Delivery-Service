import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { validate } from '../validationResult';

export const validateCreateOrder = [
  body('biker_id')
    .exists()
    .withMessage('biker_id is missing from the body')
    .notEmpty()
    .withMessage('biker_id is empty')
    .isNumeric()
    .withMessage('biker_id must be a number'),
  body('parcel_id')
    .exists()
    .withMessage('biker_id is missing from the body')
    .notEmpty()
    .withMessage('biker_id is empty')
    .isNumeric()
    .withMessage('biker_id must be a number'),
  (req: Request, res: Response, next: NextFunction) => validate(req, res, next)
];
