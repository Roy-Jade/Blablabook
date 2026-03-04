// Fichier gérant toute la transmission d'information entre le front et le back
// On appelle la variable paramétrée dans ce fichier à chaque connexion front/back

import axios from 'axios';

// La constante api contient l'URL du back
const api = axios.create({
  baseURL: 'http://localhost:3000/api', //import.meta.env.API_URL || 
  withCredentials: true,
});

// L'interceptor n'est utile que pour un jwt stocké en localStorage ; pour du cookie, il est inutile
// // A chaque requête API on ajoute le token dans le header de la requête
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token'); // On récupère le token stocké localement
//   if (token) {
//     // S'il existe, on ajoute le token avec le texte "Bearer " (qui veut dire "porteur de ")dans le champ Authorization du header
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log('Interceptor error:', error.response?.status, error.config?.url);
    // Si une erreur 401 (envoyée en cas d'absence de token valide) est reçue, on redirige vers la page de login.
    // On exclus de cela la requête demandant les infos de l'utilisateur actuellement connecté, pour ne pas renvoyer vers /login dès qu'on arrive sur le site.
    if (error.response?.status === 401 && !error.config.url.includes('/auth/user')) {
      // localStorage.removeItem("currentUser");
      // Optionally redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
