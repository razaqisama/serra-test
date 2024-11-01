/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get All Users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Get all users data success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestID:
 *                   type: string
 *                   example: "b866acb5-7777-465c-a136-70f9f2066987"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items: 
 *                      properties:
 *                        id:
 *                          type: integer
 *                          example: 1
 *                        name:
 *                          type: string
 *                          example: "John"
 *                        age:
 *                          type: integer
 *                          example: 20
 *                        email:
 *                          type: string
 *                          example: "users@email.com"
 *                 message:
 *                   type: string
 *                   example: "Create Category Data Success"
 *       404:
 *         description: Category Is Empty
 *       500:
 *         description: Internal Server Error
 */

import { db } from "../../db";
import { createResponse } from "../../utils/create-response";
import { NextFunction, Request, Response } from "express";

export async function getUsers(_: Request, res: Response, next: NextFunction) {
  try {
    const users = await db.query.usersTable.findMany();

    return createResponse(res, 200, {
      data: users,
      message: "Get all users data success",
    })
  } catch (error) {
    return next(error);
  }
}