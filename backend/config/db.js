// j'importe le Pool depuis le module 'pg' => ça me sert à gérer les connexions à ma base PostgreSQL
import { Pool } from 'pg';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Charge les variables d'environnement depuis le .env
// dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Sert à gérer les connexions PSQL (optimisation et requêtes)
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Export de la méthode query()
export default {
  query: (text, params) => pool.query(text, params),
};
