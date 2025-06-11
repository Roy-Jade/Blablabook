import './Header.scss';

export default function Header() {
    return(
        <>
            <a href="/"><img src="/img/logo_blablabook_clair.png" alt="logo Blablabook - retour à l'accueil"/>BlaBlaBook</a>
                <nav>
                    <ul>
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/about">A propos</a></li>
                        <li><a href="/questions">Foire aux questions</a></li>
                        <li><a href="/library">Rechercher un livre</a></li>
                        <li><a href="/personnalLibrary">Ma bibliothèque</a></li>
                        <li><a href="/login">Connexion</a></li>
                        <li><a href="/dashboard">Mon compte</a></li>
                        <li><a href="/logout">Déconnexion</a></li>
                    </ul>
                </nav>
        </>
    )
}