import sequelize from '../config/db.js';
import { DataTypes } from 'sequelize';

const Livre = sequelize.define('Livre', {
  id_livre: { type: DataTypes.INTEGER, primaryKey: true },
  ISBN: DataTypes.STRING,
  titre: DataTypes.STRING,
  auteur: DataTypes.STRING,
  date_publication: DataTypes.DATEONLY,
  nombre_page: DataTypes.SMALLINT,
  resume: DataTypes.STRING
}, {
  tableName: 'Livres',
  timestamps: false
});

const Utilisateur = sequelize.define('Utilisateur', {
  id_utilisateur: { type: DataTypes.INTEGER, primaryKey: true },
  pseudonyme: DataTypes.STRING,
  email: DataTypes.STRING,
  mot_de_passe: DataTypes.STRING
}, {
  tableName: 'Utilisateurs',
  timestamps: false
});

const Interagit = sequelize.define('Interagit', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  ISBN: DataTypes.STRING,
  est_lu: DataTypes.BOOLEAN,
  est_partage: DataTypes.BOOLEAN,
  note: DataTypes.SMALLINT,
  commentaire: DataTypes.STRING,
  date_creation_commentaire: DataTypes.DATE,
  id_utilisateur: DataTypes.INTEGER
}, {
  tableName: 'utilisateur_interagit_livre',
  timestamps: false
});

async function runTests() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion OK à PostgreSQL');

    // TEST 1 – Lire tous les livres
    const livres = await Livre.findAll();
    console.log('\n📘 TEST 1 : Tous les livres enregistrés :');
    console.log(JSON.stringify(livres, null, 2));

    // TEST 2 – Lire tous les utilisateurs
    const users = await Utilisateur.findAll();
    console.log('\n👤 TEST 2 : Tous les utilisateurs enregistrés :');
    console.log(JSON.stringify(users, null, 2));

    // TEST 3 – Lire toutes les interactions
    const inters = await Interagit.findAll();
    console.log('\n🔁 TEST 3 : Toutes les interactions :');
    console.log(JSON.stringify(inters, null, 2));

    // TEST 4 – Vérifier qu’un livre a un titre précis
    const livreBehemoth = await Livre.findOne({ where: { titre: 'Le Livre de la promo Behemoth' } });
    console.log('\n📗 TEST 4 : Livre "Le Livre de la promo Behemoth" trouvé ? =>', !!livreBehemoth);

    // TEST 5 – Vérifier qu’un utilisateur existe par email
    const userEmailCheck = await Utilisateur.findOne({ where: { email: 'nouhayla@example.com' } });
    console.log('\n📧 TEST 5 : Utilisateur avec email "nouhayla@example.com" trouvé ? =>', !!userEmailCheck);

    // TEST 6 – Vérifier qu’il y a au moins 1 interaction avec une note
    const noteTest = await Interagit.findOne({ where: { note: { [sequelize.Op.not]: null } } });
    console.log('\n⭐ TEST 6 : Une interaction avec une note ? =>', !!noteTest);

    // TEST 7 – Compter les livres dans la table
    const nbLivres = await Livre.count();
    console.log(`\n📚 TEST 7 : Nombre total de livres => ${nbLivres}`);

    // TEST 8 – Récupérer les titres des livres avec plus de 400 pages
    const grosLivres = await Livre.findAll({ where: { nombre_page: { [sequelize.Op.gt]: 400 } } });
    console.log('\n📕 TEST 8 : Livres de plus de 400 pages :');
    grosLivres.forEach(l => console.log(`- ${l.titre}`));

    // TEST 9 – Vérifier que chaque interaction est liée à un utilisateur existant
    const orphelins = await Interagit.findAll({
      include: [{
        model: Utilisateur,
        required: false
      }],
      where: { '$Utilisateur.id_utilisateur$': null }
    });
    console.log(`\n👀 TEST 9 : Interactions sans utilisateur lié : ${orphelins.length}`);

    // TEST 10 – Tester une contrainte métier : pas de commentaire sans note
    const mauvais = await Interagit.findAll({
      where: {
        note: null,
        commentaire: { [sequelize.Op.not]: null }
      }
    });
    console.log(`\n⚠️ TEST 10 : Interactions AVEC commentaire mais SANS note : ${mauvais.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors des tests :', error);
    process.exit(1);
  }
}

runTests();
