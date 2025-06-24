import {Link} from 'react-router';
import './Header.scss';

export default function Header() {
    return(
        <header className='header'>
            <div className='header_logo'>
                <Link to="/">
                <img src='/img/logo_blablabook_clair.png' alt="logo Blablabook - retour à l'accueil"></img>
                <p className='header__title'>BlablaBook</p>
                </Link>
            </div>
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