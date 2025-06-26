//  On peut se créer une instance d'axios dans un fichier api.js par exemple     
// ---- Fichier api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// A chaque requête API on ajoute le token dans le header
// Il faut que ce token ait été stocké dans le localstorage au moment du login
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// ---- Fichier du composant login
useEffect(() => {
  const login = async () => {
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  login();
}, [email, password]);

// ---- Dans n'importe quel autre composant on utilise l'ojbjet api pour faire des appels API
// On appel un endpoint protégé, vu que le token est stocké en local storage et fourni à chaque requête
// l'utilisateur pourra accéder à cet endpoint
useEffect(() => {
  const fetchPrivateArticles = async () => {
    try {
      const response = await api.get('/user/articles');
      setArticles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchArticles();
}, []);