import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/router.js';
import authRouter from './routers/authRouter.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser()); // Permet de recevoir et traiter des cookies

// Gestion des CORS.
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use('/api/auth', authRouter);

export default app;