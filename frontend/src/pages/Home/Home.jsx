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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eveniet labore exercitationem ab aliquid dicta laborum autem maxime aperiam, accusamus quos ducimus, minus consequuntur! Temporibus in perspiciatis recusandae. Laborum, veritatis.
            Sunt, possimus. </p>
            <h2>Notre sélection</h2>

            <Carousel />

            <Link className='button button_big' to="/register">S'inscrire</Link>

            {/* Finir de modifier ici */}
        </>
    )
}