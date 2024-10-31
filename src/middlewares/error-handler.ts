import { createResponse } from '@/utils/create-response';
import { NextFunction, Request, Response } from 'express';

export interface IError {
  message: string;
  status: number;
}

export default function errorHandler(
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { status, message } = err;
  return createResponse(res, status ?? 500, {
    error: message ?? 'Internal Server Error',
  })
}