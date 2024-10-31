/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a User by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               age:
 *                 type: integer
 *                 example: 30
 *               email:
 *                 type: string
 *                 example: "janedoe@email.com"
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestID:
 *                   type: string
 *                   example: "e6e587f2-5e1b-4af4-a3cd-f09c2a1a827e"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Jane Doe"
 *                     age:
 *                       type: integer
 *                       example: 30
 *                     email:
 *                       type: string
 *                       example: "janedoe@email.com"
 *                 message:
 *                   type: string
 *                   example: "User updated successfully."
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

import { db } from "@/db";
import { usersTable } from "@/models";
import { createResponse } from "@/utils/create-response";
import { ResponseError } from "@/utils/response-error";
import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { name, age, email } = req.body;

  try {
    const [updatedUser] = await db.update(usersTable)
      .set({
        name,
        age,
        email
      })
      .where(eq(usersTable.id, id as unknown as number))
      .returning();

    if (!updatedUser) {
      throw new ResponseError("User not found", 404);
    }

    return createResponse(res, 200, {
      data: updatedUser,
      message: "User updated successfully.",
    })
  } catch (error) {
    return next(error);
  }
}