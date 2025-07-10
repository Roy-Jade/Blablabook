import bcrypt from 'bcrypt';

const motDePasse = 'abcdef'; // mot de passe pour nouhayla
const saltRounds = 10;

const genererHash = async () => {
  const hash = await bcrypt.hash(motDePasse, saltRounds);
  console.log('Nouveau hash:', hash);
};

genererHash();
