/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a New User
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               age:
 *                 type: integer
 *                 example: 25
 *               email:
 *                 type: string
 *                 example: "johndoe@email.com"
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestID:
 *                   type: string
 *                   example: "c9b67fb3-4b2b-4e6d-bddd-930d4db12d69"
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     age:
 *                       type: integer
 *                       example: 25
 *                     email:
 *                       type: string
 *                       example: "johndoe@email.com"
 *                 message:
 *                   type: string
 *                   example: "User created successfully."
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */

import { sendMessageToQueue } from "../../rabbitmq";
import { db } from "../../db";
import { usersTable } from "../../models";
import { createResponse } from "../../utils/create-response";
import { NextFunction, Request, Response } from "express";

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { name, age, email } = req.body;

  try {
    const [createdUser] = await db.insert(usersTable).values({
      name,
      age,
      email,
    }).returning();

    await sendMessageToQueue('user_notification', createdUser);

    return createResponse(res, 201, {
      data: createdUser,
      message: "User created successfully",
    })
  } catch (error) {
    return next(error);
  }
}