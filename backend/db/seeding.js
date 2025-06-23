// ===== Chargement du fichier .env
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chargement du .env
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

// ===== Imports techniques =====
import sequelize from '../config/db.js';  // Connexion à la base de données
import { DataTypes } from 'sequelize';

// ===== Modèle Livre =====
const Livre = sequelize.define('Livre', {
  id_livre: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ISBN: {
    type: DataTypes.STRING(13),
    unique: true,
    allowNull: false
  },
  titre: {
    type: DataTypes.STRING(130),
    allowNull: false
  },
  auteur: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date_publication: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  nombre_page: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  resume: {
    type: DataTypes.STRING(1000),
    allowNull: false
  }
});

// ===== Modèle Utilisateur =====
const Utilisateur = sequelize.define('Utilisateur', {
  id_utilisateur: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pseudonyme: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  mot_de_passe: {
    type: DataTypes.STRING(64),
    allowNull: false
  }
});

// ===== Modèle de liaison : Interagit =====
const Interagit = sequelize.define('Interagit', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ISBN: {
    type: DataTypes.STRING(13),
    allowNull: false
  },
  est_lu: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  est_partage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  note: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  commentaire: {
    type: DataTypes.STRING(2000),
    allowNull: true
  },
  date_creation_commentaire: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'utilisateur_interagit_livre'
});

// ===== Associations =====
Livre.hasMany(Interagit, { foreignKey: 'ISBN', sourceKey: 'ISBN' });
Interagit.belongsTo(Livre, { foreignKey: 'ISBN', targetKey: 'ISBN' });

Utilisateur.hasMany(Interagit, { foreignKey: 'id_utilisateur' });
Interagit.belongsTo(Utilisateur, { foreignKey: 'id_utilisateur' });

// ===== Synchronisation de la base =====
async function seedDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('La base de données a été synchronisée avec succès !');

    // Ajout  de la contrainte CHECK
    await sequelize.query(`
      ALTER TABLE utilisateur_interagit_livre
      ADD CONSTRAINT check_note_commentaire
      CHECK (note IS NOT NULL OR commentaire IS NULL);
    `);

    // Création de livres
    const livres = await Livre.bulkCreate([
      {
        ISBN: '9781234567890',
        titre: 'Le Livre de la promo Behemoth',
        auteur: 'Grégoire',
        date_publication: '2025-01-01',
        nombre_page: 300,
        resume: 'Un résumé passionnant.'
      },
      {
        ISBN: '9780987654321',
        titre: 'Aventure en React',
        auteur: 'Geneviève',
        date_publication: '2025-06-15',
        nombre_page: 450,
        resume: 'Un autre résumé captivant.'
      }
    ]);

    // Création d'utilisateurs
    const utilisateurs = await Utilisateur.bulkCreate([
      {
        pseudonyme: 'nouhayla',
        email: 'nouhayla@example.com',
        mot_de_passe: '123456'
      },
      {
        pseudonyme: 'nicolas',
        email: 'nicolas@example.com',
        mot_de_passe: 'abcdef'
      }
    ]);

    // Exemple d'interaction
    await Interagit.create({
      ISBN: '9781234567890',
      id_utilisateur: utilisateurs[0].id_utilisateur,
      est_lu: true,
      est_partage: false,
      note: 4,
      commentaire: 'Super livre !'
    });

    console.log('Les données ont été insérées avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors du seeding :', error);
    process.exit(1);
  }
}

// ===== Exécution =====
seedDatabase();
