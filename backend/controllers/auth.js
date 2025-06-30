// Fichier du  controller
import db from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import express from 'express';

// app.use(express.json())

const authController = {
  // register : async (req, res) => {
  //   console.log("Création du compte...")
  //   const { email, password } = req.body;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = await User.create({ email, password: hashedPassword });
  
  //   res.status(201).json({
  //     user,
  //   });
  // },

  login : async (req, res) => {
    console.log("Connexion en cours...")
    const { email, password } = req.body;
    const result = await db.query(
      'SELECT * FROM utilisateur WHERE email = $1',
      [email]);
    
    const user = result.rows[0];
  
    if (!user) {
      return res.status(401).json({
        message: "Erreur : l'utilisateur et le mot de passe ne correspondent pas",
      });
    }
    
    console.log(user)
    console.log("Mot de passe : "+user.mot_de_passe)
    const isPasswordValid = await bcrypt.compare(password, user.mot_de_passe);
  
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Erreur : l'utilisateur et le mot de passe ne correspondent pas",
      });
    }
    
    const token = jwt.sign({ email: user.email, id: user._id }, 'secret', { expiresIn: '1h' });
  
    res.status(200).json({
      token,
      user,
    });
  },
}

export default authController;