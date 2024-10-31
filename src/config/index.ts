import 'dotenv/config';

export const config = {
  app: {
    port: process.env.APP_PORT || 3000,
  },
  db: {
    pg: {
      host: process.env.PG_DB_HOST || "",
      port: Number(process.env.PG_DB_PORT) || 5432,
      database: process.env.PG_DB_NAME || "",
      user: process.env.PG_DB_USERNAME || "",
      password: process.env.PG_DB_PASSWORD || "",
      ssl: false,
    },
  },
};
