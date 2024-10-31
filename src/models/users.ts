import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import Joi from 'joi';

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
export class UsersValidation {
  static create() {
    return Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.number().required(),
    });
  }

  static update() {
    return Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      age: Joi.number().required(),
    });
  }
  
  static updateParams() {
    return Joi.object({
      id: Joi.string().required(),
    });
  }

  static deleteParams() {
    return Joi.object({
      id: Joi.string().required(),
    });
  }
}