import { describe, it, expect } from 'vitest';
import { generateToken } from "../utils/generateToken";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

describe('generateToken', () =>{
    it('cas fonctionnel', () => {
        const data = {email : "test@test.fr", id:87};
        const decodedToken = jwt.verify(generateToken(data.email, data.id), process.env.JWT_SECRET);
        expect(decodedToken).toMatchObject({email:"test@test.fr", id:87})
    });

    it('cas email/id vide', () => {
        const data = {email : undefined, id:undefined};
        expect(() => generateToken(data.email, data.id).toThrow("Email ou ID manquant"))
    });

    it('cas pas de secret', () => {
        const originalSecret = process.env.JWT_SECRET;
        delete process.env.JWT_SECRET;
        const data = {email : "test@test.fr", id:87};
        expect(() => generateToken(data.email, data.id)).toThrow("Secret manquant ou vide")
        process.env.JWT_SECRET = originalSecret;
    });

    it('cas secret vide', () => {
        const originalSecret = process.env.JWT_SECRET;
        process.env.JWT_SECRET = "";
        const data = {email : "test@test.fr", id:87};
        expect(() => generateToken(data.email, data.id)).toThrow("Secret manquant ou vide")
        process.env.JWT_SECRET = originalSecret;
    });
})