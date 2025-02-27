import express from 'express';
import { PlaceRouter } from '~/routes/PlaceRoute.js';

const app = express();

const API_BASE_URL = '/api/v1';
const port = 3000;

app.use(express.json());
app.use(`${API_BASE_URL}/places`, PlaceRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
