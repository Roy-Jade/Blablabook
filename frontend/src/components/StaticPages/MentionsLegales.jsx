import { Helmet } from 'react-helmet';

export default function MentionsLegale({ sections }){
    return (
        <section>
            <Helmet>
                <title>Mentions Légales - BlablaBook</title>
                <meta name='description' content="Veuillez lire nos mentions légales concernant l'utilisation du site BlablaBook."></meta>
            </Helmet>
            <h1>Mentions Légales</h1>
            <p>Bienvenue sur notre site BlaBlaBook, Veuillez lire attentivement nos conditions générales d'utilisation avant d'utiliser notre site</p>
            <ol>
                {sections.map((item, index) =>(
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>

                    </li>
                ))}
            </ol>
        </section>
    );
}
    