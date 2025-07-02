import {Link} from 'react-router';
import { Helmet } from 'react-helmet';

export default function Accessibite({ sections }){
    return (
        <section>
            <Helmet>
                <title>Accessibilité - BlablaBook</title>
                <meta name="description" content="Découvrez les engagements de BlablaBook en matière d’accessibilité numérique. Accessibilité du contenu, aides disponibles, contact pour signaler un problème."/>
            </Helmet>
            <h1> Accessibilité</h1>
            <p>Bienvenue sur notre site BlaBlaBook, Veuillez lire attentivement nos <Link className='text_link' to='/privacy'>conditions générales d'utilisation</Link> avant d'utiliser le site.</p>
            <ol>
                {sections.map((item, index) =>(
                    <div key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        {item.footer && (
                            <p>
                            {item.footer} <Link className='text_link' to="/contact">Contact</Link>.
                            </p>
                        )}
                    </div>
                ))}
            </ol>
        </section>
    );
}