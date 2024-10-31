import { defineConfig } from 'drizzle-kit';
import { config } from './src/config';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: config.db.pg,
  verbose: true,
  strict: true,
});