import 'dotenv/config';

export const config = {
  app: {
    port: process.env.APP_PORT || 3000,
    baseUrl: process.env.APP_BASE_URL,
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
  mailer: {
    service: process.env.MAILER_SERVICE,
    user: process.env.MAILER_USER,
    password: process.env.MAILER_PASSWORD,
  }
};
