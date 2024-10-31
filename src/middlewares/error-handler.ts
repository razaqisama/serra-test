import { createResponse } from '../utils/create-response';
import { NextFunction, Request, Response } from 'express';

export interface IError {
  message: string;
  statusCode: number;
}

export default function errorHandler(
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { statusCode, message } = err;
  // console.log(err);
  return createResponse(res, statusCode ?? 500, {
    message: message ?? 'Internal Server Error',
  })
}