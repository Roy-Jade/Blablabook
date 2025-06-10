import express from 'express';
import * as dotenv from 'dotenv';
// import router from './backend/routers/router.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('../frontend/public'));

// Partie qui sera remplacée quand les fichiers des routes seront faits :
const router = express.Router();
router.get('/', (req, res) => {
    res.render('home')
});
// Fin de la partie qui sera remplacée

app.use(router);

app.listen(port, () => {
    console.log(`Serveur sur http://localhost:${port}/`);
  });