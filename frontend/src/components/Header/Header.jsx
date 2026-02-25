import {Link} from 'react-router';
import './Header.scss';
import {toggleDisplayBurger} from './scriptHeader';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

export default function Header() {

    const currentUser = useContext(CurrentUserContext).currentUser;
    
    // Cette fonction sert à réinitialiser l'affichage du menu quand on change de page, sans quoi le menu burger reste ouvert même en cliquant sur l'un de ses liens
    let hideBurgerOnPageChange = () => {
        if (window.innerWidth>=992) {
                document.getElementById("header_navbar_account")?.classList.add("hidden");
        } else {
                document.getElementById("header_navbar")?.classList.add("hidden");
        }
    }

    return(
        <header className='header'>
            <div className='header_logo'>
                <Link onClick={hideBurgerOnPageChange} to="/">
                <img src='/img/logo_blablabook_clair.png' alt="logo Blablabook - retour à l'accueil"></img>
                <p className='header__title'>BlablaBook</p>
                </Link>
            </div>
            <button className='burger' onClick={(e) => {toggleDisplayBurger(e, ['header_navbar', 'header_navbar_account']);}}><img src="/img/burger_blanc.png" alt="Dérouler le menu de navigation" /></button>
            <nav id='header_navbar' className='header__navigation'>
                <Link onClick={hideBurgerOnPageChange} to="/">Accueil</Link>
                <Link onClick={hideBurgerOnPageChange} to="/about">A propos</Link>
                <Link onClick={hideBurgerOnPageChange} to="/questions">Foire aux questions</Link>
                <Link onClick={hideBurgerOnPageChange} to="/library">Rechercher un livre</Link>

                {!currentUser && <Link onClick={hideBurgerOnPageChange} to="/login">Connexion</Link>}

                {currentUser && (<>
                    <Link onClick={hideBurgerOnPageChange} to={`/library/${currentUser}`}>Ma bibliothèque</Link>

                    <button onClick={(e) => {toggleDisplayBurger(e,  ['header_navbar_account']);}} className='header__navigation__account-icon'><img src="/img/mon_compte_50px.png" alt="Dérouler les liens pour mon compte" /></button>
                    
                    <div id='header_navbar_account' className='header__navigation__account-link hidden'>
                        <Link onClick={hideBurgerOnPageChange} to="/dashboard">Mon compte</Link>
                        <Link onClick={hideBurgerOnPageChange} to="/logout">Déconnexion</Link>
                    </div>
                </>)}
            </nav>
        </header>
    )
}