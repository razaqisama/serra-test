import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config } from '../config';
import * as schema from "./schema";
// import * as relations from "./relations";

export const client = new Pool(config.db.pg);

export const db = drizzle(client, { schema: { ...schema } });
