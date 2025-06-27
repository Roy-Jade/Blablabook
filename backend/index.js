import express from 'express';
import * as dotenv from 'dotenv';
import session from 'express-session';
import router from './app/router.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'unMotDePasseUltraSecret123',
  resave: true,
  saveUninitialized: true
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('../frontend/public'));

app.use(router);

app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
