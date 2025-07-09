// test-password.js

import bcrypt from 'bcrypt';

<<<<<<< HEAD
const motSaisi = 'Admin123*'; //
const hashStocke = '$2b$10$EzkYZKhVm2d7z6wsGyFkV.XA7e4NT.kwKaK0/ycKD/7lWj7VwWUkO'; // <- hash depuis ta BDD
=======
const motSaisi = 'Azerty12@'; //
const hashStocke = '$2b$10$bBlANCvdxaKDf2cyXiZLYecv2La2U5ujcmMS3UhKYQvgzcW3stcEi'; // <- hash depuis ta BDD
>>>>>>> dev

const test = async () => {
const isValid = await bcrypt.compare(motSaisi, hashStocke);
console.log('✅ Mot de passe valide ? ', isValid);
};

test();
<<<<<<< HEAD
//node test-password.js
=======
>>>>>>> dev
