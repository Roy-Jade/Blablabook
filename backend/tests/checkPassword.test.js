import { vi, describe, it, expect, beforeEach } from 'vitest';
import { checkPassword } from '../utils/checkPassword.js';
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Mock des dépendances externes
vi.mock('../config/db.js', () => ({
  default: { query: vi.fn() }
}));
vi.mock('bcrypt');

describe('checkPassword', () => {
  // Réinitialise les mocks entre chaque test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('cas fonctionnel — email et mot de passe corrects', async () => {
    db.query.mockResolvedValue({
      rows: [{ reader_password: 'hashedPassword' }]
    });
    bcrypt.compare.mockResolvedValue(true);

    await expect(checkPassword('test@test.fr', 'correctPassword')).resolves.toBeUndefined();
  });

  it('utilisateur introuvable', async () => {
    db.query.mockResolvedValue({ rows: [] });

    const error = await checkPassword('inconnu@test.fr', 'password').catch(e => e);
    expect(error.code).toBe('Invalid_credentials');
  });

  it('mot de passe incorrect', async () => {
    db.query.mockResolvedValue({
      rows: [{ reader_password: 'hashedPassword' }]
    });
    bcrypt.compare.mockResolvedValue(false);

    const error = await checkPassword('test@test.fr', 'wrongPassword').catch(e => e);
    expect(error.code).toBe('Invalid_credentials');
  });

  it('erreur base de données', async () => {
    db.query.mockRejectedValue(new Error('Connexion BDD perdue'));

    await expect(checkPassword('test@test.fr', 'password')).rejects.toThrow('Connexion BDD perdue');
  });
});