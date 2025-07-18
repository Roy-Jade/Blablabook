import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './routers/router.js';


const port = process.env.PORT || 3000;
const app = express();

app.use(cors()); // Gestion des CORS. Ici, nous autorisons toute requête étrangère.

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Serveur en ligne sur http://localhost:${port}`);
});