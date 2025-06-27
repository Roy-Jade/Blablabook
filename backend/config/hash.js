// backend/hash.js

//il est recommandé de sup ce fichier après

import bcrypt from 'bcrypt';

// Mettre le MDP en clair TEMPORAIREMENT pour le nouvel utilisateur
const mdpClair = 'paris75006';

const hashPassword = async () => {
  const hash = await bcrypt.hash(mdpClair, 10);
  console.log('Mot de passe haché :', hash);
};

hashPassword();
