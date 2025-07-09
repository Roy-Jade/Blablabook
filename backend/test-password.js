// test-password.js

import bcrypt from 'bcrypt';

const motSaisi = 'Azerty12@'; //
const hashStocke = '$2b$10$bBlANCvdxaKDf2cyXiZLYecv2La2U5ujcmMS3UhKYQvgzcW3stcEi'; // <- hash depuis ta BDD

const test = async () => {
const isValid = await bcrypt.compare(motSaisi, hashStocke);
console.log('✅ Mot de passe valide ? ', isValid);
};

test();
