import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ResponseError } from '../utils/response-error';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new ResponseError("Invalid input data", 400));
    } else {
      next();
    }
  };
};