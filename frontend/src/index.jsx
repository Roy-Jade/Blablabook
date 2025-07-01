import { createRoot } from 'react-dom/client';

import App from './App';

import '../static/scss/index.scss';

createRoot(document.getElementById('root')).render(
    <>
      <App/>
    </>
  );