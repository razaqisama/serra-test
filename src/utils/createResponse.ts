import { Response } from "express";
import hyperid from "hyperid";

export function createResponse(response: Response, code: number, payload: object) {
  response.status(code || 500).json({
    requestID: hyperid().uuid,
    status: code,
    ...payload
  });
}