// test-password.js

import bcrypt from 'bcrypt';

const motSaisi = 'abcdef'; //
const hashStocke = '$2b$10$fHDfKzOstDLmJnIb9LLGpu2YgCF7cpYnUIJrN61YCX6XSVxGDN4nS'; // <- hash depuis ta BDD

const test = async () => {
const isValid = await bcrypt.compare(motSaisi, hashStocke);
console.log('✅ Mot de passe valide ? ', isValid);
};

test();