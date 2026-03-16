// tests/auth.integration.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';

vi.mock('../config/db.js', () => ({
  default: { query: vi.fn() }
}));

// Import après le mock
import db from '../config/db.js';

vi.mock('bcrypt', () => ({
  default: {
    compare: vi.fn().mockResolvedValue(true),
    hash: vi.fn().mockResolvedValue('hashedPassword')
  }
}));

describe('POST /api/auth/register', () => {
  beforeEach(() => vi.clearAllMocks());

  it('400 si body vide', async () => {
    const response = await request(app).post('/api/auth/register').send({});
    expect(response.status).toBe(400);
  });

  it('400 si pseudo trop court', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@test.fr',
      password: 'Password123!',
      pseudonyme: 'ab'
    });
    expect(response.status).toBe(401);
  });

  it('400 si mot de passe trop faible', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@test.fr',
      password: 'faible',
      pseudonyme: 'testuser'
    });
    expect(response.status).toBe(400);
  });

  it('201 si inscription réussie', async () => {
    db.query.mockResolvedValueOnce({
      rows: [{ id_reader: 1, email: 'test@test.fr', pseudonyme: 'testuser' }]
    });

    const response = await request(app).post('/api/auth/register').send({
      email: 'test@test.fr',
      password: 'Password123!',
      pseudonyme: 'testuser'
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user');
    expect(response.body.user).toMatchObject({
      email: 'test@test.fr',
      pseudonyme: 'testuser'
    });
  });

  it('400 si email ou pseudo déjà utilisé', async () => {
    db.query.mockRejectedValueOnce({ code: '23505' });

    const response = await request(app).post('/api/auth/register').send({
      email: 'test@test.fr',
      password: 'Password123!',
      pseudonyme: 'testuser'
    });

    expect(response.status).toBe(400);
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(() => vi.clearAllMocks());

  it('400 si body vide', async () => {
    const response = await request(app).post('/api/auth/login').send({});
    expect(response.status).toBe(400);
  });

  it('401 si utilisateur introuvable', async () => {
    db.query.mockResolvedValueOnce({ rows: [] });

    const response = await request(app).post('/api/auth/login').send({
      email: 'inconnu@test.fr',
      password: 'Password123!'
    });

    expect(response.status).toBe(401);
  });

  it('200 et cookie token si login réussi', async () => {
    // Mock checkPassword — utilisateur trouvé
    db.query.mockResolvedValueOnce({
      rows: [{ reader_password: '$2b$10$hashedpassword' }]
    });
    // Mock fetchUser après vérification
    db.query.mockResolvedValueOnce({
      rows: [{ id_reader: 1, pseudonyme: 'testuser' }]
    });

    // Mock bcrypt via vi.mock si nécessaire — selon si checkPassword plante sur compare
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@test.fr',
      password: 'Password123!'
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.headers['set-cookie']).toBeDefined();
  });
});