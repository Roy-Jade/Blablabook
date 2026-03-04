import express from 'express';
// import * as dotenv from 'dotenv';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/router.js';
import authRouter from './routers/authRouter.js';

// dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser()); // Permet de recevoir et traiter des cookies
app.use(cors({
  
  origin: process.env.FRONTEND_URL,
  credentials: true,
})); // Gestion des CORS. Ici, nous autorisons toute requête étrangère.

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Serveur en ligne sur http://localhost:${port}`);
});