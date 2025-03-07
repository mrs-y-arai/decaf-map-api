import express from 'express';
import { ShopRouter } from '~/routes/ShopRoute.js';
import cors from 'cors';

const app = express();

const API_BASE_URL = '/api/v1';
const port = 8080;
const frontendBaseUrl = process.env.FRONTEND_BASE_URL;

const corsOptions = {
  origin: frontendBaseUrl,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(`${API_BASE_URL}/shops`, ShopRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
