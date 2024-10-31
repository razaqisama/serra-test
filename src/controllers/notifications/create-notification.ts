/**
 * @swagger
 * /api/v1/notifications:
 *   post:
 *     summary: Create a New Notification
 *     tags:
 *       - Notifications
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@email.com"
 *     responses:
 *       201:
 *         description: Notification created successfully.
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
 *                     message:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@email.com"
 *                 message:
 *                   type: string
 *                   example: "Notification created successfully."
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal Server Error
 */

import { sendEmail } from "../../utils/send-email";
import { db } from "../../db";
import { notificationTable } from "../../models";
import { createResponse } from "../../utils/create-response";
import { NextFunction, Request, Response } from "express";

export async function createNotification(req: Request, res: Response, next: NextFunction) {
  const { message, email } = req.body;

  try {
    const [createdNotification] = await db.insert(notificationTable).values({
      message,
      email,
    }).returning();

    await sendEmail({
      to: email,
      subject: "User Created Notification",
      text: message,
    })

    return createResponse(res, 201, {
      data: createdNotification,
      message: "Notification created successfully",
    });
  } catch (error) {
    return next(error);
  }
}