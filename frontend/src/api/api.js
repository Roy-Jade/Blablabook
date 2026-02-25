// Fichier gérant toute la transmission d'information entre le front et le back
// On appelle la variable paramétrée dans ce fichier à chaque connexion front/back

import axios from 'axios';

// La constante api contient l'URL du back
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// A chaque requête API on ajoute le token dans le header de la requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // On récupère le token stocké localement
  if (token) {
    // S'il existe, on ajoute le token avec le texte "Bearer " (qui veut dire "porteur de ")dans le champ Authorization du header
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      // Optionally redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
