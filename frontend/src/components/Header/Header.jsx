import {Link} from 'react-router';
import './Header.scss';
import logo_clair from '../../../public/img/logo_blablabook_clair.png';


export default function Header() {
    return(
        <header className='header'>
            <Link to="/">
            <img src={logo_clair} alt="logo Blablabook - retour à l'accueil"/>
            <p className='header__title'>BlablaBook</p>
            </Link>
                <nav className='header__navigation'>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/about">A propos</Link></li>
                        <li><Link to="/questions">Foire aux questions</Link></li>
                        <li><Link to="/library">Rechercher un livre</Link></li>
                        <li><Link to="/personnalLibrary">Ma bibliothèque</Link></li>
                        <li className='hidden'><Link to="/login">Connexion</Link></li>
                        <li><Link to="/dashboard">Mon compte</Link></li>
                        <li className='hidden'><Link to="/logout">Déconnexion</Link></li>
                    </ul>
                </nav>
        </header>
    )
}