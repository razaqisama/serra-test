/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a User by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 requestID:
 *                   type: string
 *                   example: "b9c56af3-58a2-4c2a-b5f2-8dbf3241bb60"
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully."
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

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id }= req.params;
  
  try {
    const [deletedUser] = await db.delete(usersTable)
      .where(eq(usersTable.id, id as unknown as number))
      .returning();

    if (!deletedUser) {
      throw new ResponseError("User not found", 404);
    }

    return createResponse(res, 200, {
      message: "User deleted successfully.",
    })
  } catch (error) {
    return next(error);
  }
}