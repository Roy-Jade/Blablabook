
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
        let authorization = req.headers.authorization.split(" ")[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.JWT_SECRET);
        } catch (e) {
            return res.status(401).send("Erreur 401 : accès non autorisé");
        }
        let userEmail = decoded.email;
        // Fetch the user by id_utilisateur 
        const userData =  db.query(
            'SELECT * FROM utilisateur WHERE email = $1',
            [userEmail]
        );
        if(userData) {
            next();
        };
    }
    // return res.status(401).send("Erreur : accès non autorisé")

    // jwt.verify(token, 'secret', function(err, decoded) {
    //     if (err) {
    //         err = {
    //             name: 'TokenExpiredError',
    //             message: 'jwt expired'
    //         }
    //     }
    // });

    // const pseudo = req.body;
    // const userData =  db.query(
    //     'SELECT * FROM utilisateur WHERE pseudonyme = $1',
    //     [pseudo]
    // ).rows[0];

    // if (!userData) {
    //     res.status(401).json({
    //         message: "Erreur : accès non autorisé",
    //     });
    // } else {
    //     const expectedToken = jwt.sign({ email: userData.email, id: userData._id }, 'secret', { expiresIn: '1h' });

    //     if(token != expectedToken) {
    //         res.status(401).json({
    //             message: "Erreur : accès non autorisé",
    //         });
    //     } else {
    //         next();
    //     }
    // }
}

export default checkJWT;