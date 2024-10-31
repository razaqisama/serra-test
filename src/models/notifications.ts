import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import Joi from 'joi';

export const notificationTable = pgTable("notifications", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  message: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export class NotificationValidation {
  static create() {
    return Joi.object({
      message: Joi.string().required(),
      email: Joi.string().email().required(),
    });
  }
}