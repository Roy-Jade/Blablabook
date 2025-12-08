import db from "../config/db.js";
import bcrypt from 'bcrypt';
import validator from 'validator';

export const loginMiddleware= async (req, res, next) => {  
  const { email, password } = req.body; // Récupération des informations envoyées en corps de requête

  // On récupère les informations de l'utilisateur
  const userData = await db.query(
    'SELECT * FROM reader WHERE email = $1',
    [email]);

  // Si l'utilisateur n'est pas trouvé, on renvoie une erreur
  if (!userData.rows[0]) {
    return res.status(401).json({
      message: "Erreur 401 : l'utilisateur et le mot de passe ne correspondent pas",
    });
  }

  // On vérifie que le mot de passe correspond bien à celui enregistré en base de donnée
  const isPasswordValid = await bcrypt.compare(password, userData.rows[0].reader_password);

  // Si ce n'est pas le cas, on renvoie une erreur
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Erreur 401 : l'utilisateur et le mot de passe ne correspondent pas", // Le message est le même pour un problème d'utilisateur ou de MDP, pour ne pas laisser d'information à un hacker
    });
  }

  // On envoie les données utilisateur au controler 
  res.locals.userData = userData.rows[0]
  res.locals.codeHTTP = 200
  next()
};





export const registerMiddleware= async (req, res, next) => {
  const { email, password, pseudonyme } = req.body; // Récupération des informations envoyées en corps de requête

  // Vérification de la longueur du pseudo (3 à 15 caractères)
  if (pseudonyme.length < 3 || pseudonyme.length > 15) {
    return res.status(401).json({
      message: "Erreur 401 : le nom d'utilisateur doit comprendre de 3 à 15 caractères",
    });
  }

  // Vérification que le mot de passe soit suffisamment sécurisé
  if (!validator.isStrongPassword(password, {
    minLength: 12,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    return res.status(400).json({
      message: "Le mot de passe doit contenir au moins 12 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial"
    });
  }

  try {
    // On hashe le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // On insère les informations du nouvel utilisateur dans la BDD
    const userData = await db.query(
      `INSERT INTO reader (email, pseudonyme, reader_password)
      VALUES ($1, $2, $3)
      RETURNING id_reader, email, pseudonyme`,
      [email, pseudonyme, hashedPassword]
    );
    
    // On envoie les données utilisateur au controler 
    res.locals.userData = userData.rows[0]
    res.locals.codeHTTP = 201
    next()

  } catch (error) {

    // Gestion du doublon pseudonyme ou email
    if (error.code === '23505') {
      return res.status(400).json({
        message: "Email ou pseudonyme déjà utilisé. Veuillez en choisir un autre."
      });
    }

    // Autres erreurs serveur
    return res.status(500).json({ message: "Erreur serveur lors de l'inscription." });
  }
};