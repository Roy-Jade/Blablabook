import { vi, describe, it, expect, beforeEach } from 'vitest';
import checkJWT from '../middleware/checkJWT.js';
import db from '../config/db.js';
import { generateToken } from '../utils/generateToken.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

vi.mock('../config/db.js', () => ({
  default: { query: vi.fn() }
}));

describe('checkJWT', () => {
  let req, res, next;

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock des objets Express
    req = { cookies: {} };
    res = {
      locals: {},
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    };
    next = vi.fn();
  });

  it('cas fonctionnel — token valide et utilisateur existant', async () => {
    const token = generateToken('test@test.fr', 87);
    req.cookies.token = token;
    db.query.mockResolvedValue({ rows: [{ id_reader: 87 }] });

    await checkJWT(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.locals.user).toBe('test@test.fr');
  });

  it('token absent', async () => {
    await checkJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('token invalide — mauvais secret', async () => {
    req.cookies.token = 'token.invalide.ici';

    await checkJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('token valide mais utilisateur introuvable en BDD', async () => {
    const token = generateToken('fantome@test.fr', 99);
    req.cookies.token = token;
    db.query.mockResolvedValue({ rows: [] });

    await checkJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('erreur base de données', async () => {
    const token = generateToken('test@test.fr', 87);
    req.cookies.token = token;
    db.query.mockRejectedValue(new Error('Connexion BDD perdue'));

    await checkJWT(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});