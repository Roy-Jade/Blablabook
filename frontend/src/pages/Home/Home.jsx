import {Link} from 'react-router';
import React from 'react';
import { Helmet } from 'react-helmet';
import Carousel from '../../components/Carousel/Carousel';
import './Home.scss';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function Home() {

    return(
        <>
            <Helmet>
                <title>Accueil - BlablaBook</title>
                <meta name='description' content='Trouvez votre livre préféré'></meta>
            </Helmet>
            {/* Commencer à modifier ici */}
            <h1>Votre prochaine lecture vous attend</h1>
            <p>Une envie de lire sans savoir que choisir ? des livres papier entassés dans votre bibliothèque, dans des cartons ? 
            ou encore des livres numériques épars dans votre PC ? Blablabook vous aide à sélectionner le livre qui vous fera rêver, 
            à recenser et sérier vos livres sous quelque support qu’ils soient. </p>
            <h2>Notre sélection</h2>

            <Carousel />

            <Link className='button button_big' to="/register">S'inscrire</Link>

            {/* Finir de modifier ici */}
        </>
    )
}