import cors from 'cors';
import express from "express";
import { config } from "./config";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import routes from "./routes";
import errorHandler from './middlewares/error-handler';
import { connectToRabbitMQ } from './rabbitmq';

const app = express();
const PORT = config.app.port;
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router.get('/', (_req, res) => {
  res.send('Server is up');
}));

app.use('/api/v1', routes);
app.use(errorHandler);

const server = app.listen(PORT, async () => {
  await connectToRabbitMQ();
  console.log(`Server is running on port ${PORT}`);
});

export { app, server };
