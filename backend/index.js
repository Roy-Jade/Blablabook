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

// Partie cors de l'atelier-JWT
// app.use((req, res, next) => {
  // res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
  // res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.header('Access-Control-Allow-Credentials', true);

  // // response to preflight request
  // if (req.method === 'OPTIONS') {
  //   res.sendStatus(200);
  // }
  // else {
  //   next();
  // }
// });

// Authentication routes de l'atelier-JWT
// app.post("/signup", authController.signupUser);
// app.post("/login", authController.loginUser);
// app.delete("/logout", authController.logout);
// app.get("/public-data", getPublicData);
// app.get("/private-data", isAuthenticated, getPrivateDaa);
// app.get("/profile", isAuthenticated, getProfile)

app.use(router);

// HTTP server de l'atelier-JWT
// const host = config.server; 
// app.listen(port, host, () => {
//   console.log(`🚀 Server listening on http://${host}:${port}`);
// });

app.listen(port, () => {
  console.log(`Serveur en ligne sur http://localhost:${port}`);
});