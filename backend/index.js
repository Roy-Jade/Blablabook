import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import router from './routers/router.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Serveur en ligne sur http://localhost:${port}`);
});