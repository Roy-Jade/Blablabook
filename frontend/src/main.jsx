import { createRoot } from 'react-dom/client';

// Liste des imports de page
// Pour chaque nouvelle page, créer un nouvel import
import Home from './pages/Home/Home.jsx';

// import App from './App.jsx'

// Liste des root
// Pour chaque page, créer un nouveau root

const homeDomNode = document.getElementById('home');
const homeRoot = createRoot(homeDomNode);
homeRoot.render(<Home/>);

