import jwt from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export function generateToken(email, id) {
    if (!process.env.JWT_SECRET) {
        throw new Error("Secret manquant ou vide")
    }
    if (!email || !id) {
        throw new Error("Email ou ID manquant")
    }
    return jwt.sign({ email: email, id: id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};