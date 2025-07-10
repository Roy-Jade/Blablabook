const BASE_URL = 'http://localhost:3000'; // adapte si besoin

const testRegister = async ({ email, password, pseudonyme }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, pseudonyme }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(`❌ Échec : ${data.message}`);
    } else {
      console.log(`✅ Succès : Utilisateur inscrit →`, data.user);
    }

  } catch (err) {
    console.error('❌ Erreur réseau ou serveur :', err.message);
  }
};

(async () => {
  console.log('--- Test mot de passe TROP FAIBLE ---');
  await testRegister({
    email: 'faible@test.com',
    password: 'azerty123',
    pseudonyme: 'FaibleUser'
  });

  console.log('\n--- Test mot de passe FORT ---');
  await testRegister({
    email: 'fort@test.com',
    password: 'Marizia123@ok',
    pseudonyme: 'FortUser'
  });
})();
