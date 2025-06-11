import { createRoot } from 'react-dom/client';

// Liste des imports de page
// Pour chaque nouvelle page, créer un nouvel import
import Home from './pages/Home/Home.jsx';

// Liste des imports de composants
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

// import App from './App.jsx'

// Liste des root
// Pour chaque page, créer un nouveau root

// Exemple composant home, copier les trois lignes suivantes et changer le nom home (et le composant Home) par le nom de votre page/composant
const homeDomNode = document.getElementById('home');
const homeRoot = createRoot(homeDomNode);
homeRoot.render(<Home/>);
// Fin de la partie à copier

// Ajouter vos pages ici



// Pour les composants Header et Footer, la même structure est nécessaire
const headerDomNode = document.getElementById('header');
const headerRoot = createRoot(headerDomNode);
headerRoot.render(<Header/>);
const footerDomNode = document.getElementById('footer');
const footerRoot = createRoot(footerDomNode);
footerRoot.render(<Footer/>);

