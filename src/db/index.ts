import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { config } from '../config';
import * as schema from "./schema";

const { Pool } = pg;

const client = new Pool(config.db.pg);

export const db = drizzle(client, { schema: { ...schema } });
