// Middleware qui vérifie qu'un utilisateur a un token JWT valide, et stoppe la route si ce n'est pas le cas

import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charge les variables d'environnement depuis le .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const checkJWT = async (req, res, next) => {

    if (req.headers && req.headers.authorization) {
        // req.headers.authorization contient "Bearer [token]"
        // Le split(" ") découpe la chaine de caractère sur les espaces, et on récupère ensuite l'élément à l'index [1] (donc le token)
        let authorization = req.headers.authorization.split(" ")[1],
            decoded;
        try {
            // On essaie de décoder le token pour voir s'il est valide
            decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            // S'il est non valide, on renvoie une erreur
            return res.status(401).send("Erreur 401 : accès non autorisé");
        }
        // On récupère le mail dans le token décodé
        let userEmail = decoded.email;
        // Puis on regarde s'il y a des informations utilisateurs qui correspondent au mail récupéré
        const userData = await db.query(
            'SELECT * FROM reader WHERE email = $1',
            [userEmail]
        );
        // S'il y en a, on passe à l'instruction suivante de la route
        if(userData) {
            res.locals.user = userEmail
            next();
        };
    }
}

export default checkJWT;