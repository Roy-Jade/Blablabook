// ===== Chargement du fichier .env situé à la racine du projet =====
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Sequelize } from 'sequelize';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chargement du .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// ===== Connexion Sequelize à la bdd PostgreSQL (en utilisant les vleurs définies ds mon .env) =====
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
  }
);

export default sequelize;
