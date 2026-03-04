import { createRoot } from 'react-dom/client';

import App from './App';

// Import du SCSS global du site
import '../static/scss/index.scss';

// Ajout de l'application React dans le DOM
createRoot(document.getElementById('root')).render(
      <App/>
  );
