import {Link} from 'react-router';
import './Footer.scss';

export default function Footer() {
    return(
<<<<<<< HEAD
        <>
                <nav>
=======
        <footer className='footer'>
            <nav className='footer__navigation'>
>>>>>>> dev
                <ul>
                    <li><Link to="/legal">Mentions légales</Link></li>
                    <li><Link to="/terms">Politique de confidentialité</Link></li>
                    <li><Link to="/privacy">CGU</Link></li>
                    <li><Link to="/accessibility">Accessibilité</Link></li>
                    <li><Link to="/contact">Nous contacter</Link></li>
                </ul>
            </nav>
        </footer>
    )
}