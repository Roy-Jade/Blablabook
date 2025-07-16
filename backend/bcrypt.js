import bcrypt from 'bcrypt';

const motDePasse = '123456'; 
const saltRounds = 10;

const genererHash = async () => {
  const hash = await bcrypt.hash(motDePasse, saltRounds);
  console.log('Nouveau hash:', hash);
};

genererHash();

// nicolas : abcdef
//nouhayla : 123456