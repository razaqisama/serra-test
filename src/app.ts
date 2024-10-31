import cors from 'cors';
import express from "express";
import { config } from "./config";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const app = express();
const PORT = config.app.port;
const router = express.Router();

app.use(cors());
app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', router.get('/', (_req, res) => {
  res.send('Server is up');
}));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});