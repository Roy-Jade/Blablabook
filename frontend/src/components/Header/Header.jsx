import { Link } from 'react-router';
import './Header.scss';
import {toggleDisplay} from './script';


export default function Header() {
    return(
        <header className='header'>
            <div className='header_logo'>
                <Link to="/">
                <img src='/img/logo_blablabook_clair.png' alt="logo Blablabook - retour à l'accueil"></img>
                <p className='header__title'>BlablaBook</p>
                </Link>
            </div>
            <button className='burger' onClick={(e) => {toggleDisplay(e, 'header_navbar');}}><img src="/img/burger_blanc.png" alt="Dérouler le menu de navigation" /></button>
            <nav id='header_navbar' className='header__navigation'>
                <Link to="/">Accueil</Link>
                <Link to="/about">A propos</Link>
                <Link to="/questions">Foire aux questions</Link>
                <Link to="/library">Rechercher un livre</Link>
                <Link to="/personnalLibrary">Ma bibliothèque</Link>
                <Link className='hidden' to="/login">Connexion</Link>
                <button onClick={(e) => {toggleDisplay(e,  'header_navbar_account');}} className='header__navigation__account-icon'><img src="/img/mon_compte_50px.png" alt="Dérouler les liens pour mon compte" /></button>
                <div id='header_navbar_account' className='header__navigation__account-link'>
                    <Link to="/dashboard">Mon compte</Link>
                    <Link to="/logout">Déconnexion</Link>
                </div>
            </nav>
        </header>
    )
}