import { Link } from 'react-router';
// Import du [Composant].scss
import './Book.scss';
// Import du carrousel bookmini
import BookMinis from '../../components/BookMinis/BookMinis';


//Fonction permettant de convertir et d'afficher le HTML des étoiles. Sera annulée lors de la mise en place du scss
function convertHTMLStar(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}
export default function Book() {

    const comments = [
        {
            pseudonyme: "RatBiblio",
            date: "01/06/2025",
            note: "&#11088; &#11088; &#11088; &#11088; &#11088",
            commentaire: "J'ai adoré l'ambiance de ce roman, ce monde dytopique ou le héros met fin à cette société deshumanisée. "
        },
        {
            pseudonyme: "BookAddict",
            date: "15/05/2025",
            note: "&#11088; &#11088; &#11088; &#11088; &#11088",
            commentaire: "Thème d'une société où l'on decide absolument de tout pour vous : choix entre 4 prenoms, boulot attribué d'office , relations sexuelles controlées. Ici, le monde est gouverné par un super-ordinateur, et les êtres humains subissent une uniformisation grâce à un traitement hormonal qui supprime toute violence, mais aussi toute volonté. Le fun quoi !!!  "
        },
        {
            pseudonyme: "JMlire",
            date: "25/02/2025",
            note: "&#11088; &#11088; &#11088; &#11088; &#10025",
            commentaire: "Ce roman, bien qu'ayant vieilli, décrit une société où les ordinateurs ont pris le pouvoir sur l'humanité, on s'y croirait."
        },
        {
            pseudonyme: "ToutLire",
            date: "01/04/2025",
            note: "&#11088; &#11088; &#11088; &#11088; &#11088",
            commentaire: "On a pas du tout envie de quitter Copeau, et le suspense est maintenu jusqu'au bout.  "
        },
    ];

    return (
        <>
            <h1>Détail du livre</h1>

            <section>
                {/* Connexion à l'api cover de open library afin de récupérer la couverture du livre*/}

                <img className='book__img' src="https://covers.openlibrary.org/b/isbn/9782277124344.jpg" alt="Book's cover : Un bonheur insoutenable" />
                {/*<img src="../../..public/img/cover_Ira_Levin" alt="Book's cover : Un bonheur insoutenable" />*/}

                {/*Props qui seront alimentés par l'API de la BDD
            {ISBN}
            {title}
            {author}
            {publication_date}
            {resume}*/}


            </section>

            <section>
                <h2>Notre suggestion de livres</h2>

                {/* Composant permettant l'affichage du carrousel identique à la page d'accueil */}
                <BookMinis />
            </section>

            <section>
                {/* notes correspondant à 4.5/5 dont une étoile diamant pleine gauche (a faire en SCSS)*/}
                <p>Moyenne des notes &#11088; &#11088; &#11088; &#11088; &#10025;</p>

                <button><Link to="/personnalLibrary">Ajouter à mes livres</Link></button>
            </section>

            <article>
                <h2>Commentaires</h2>

                {comments.map((comment, index) => (
                    <div key={index}>
                        <div>
                            <div><strong>{comment.pseudonyme}</strong></div>
                            <div><strong>{comment.date}</strong></div>
                            <div>{convertHTMLStar(comment.note)}</div>
                            <div>{comment.commentaire}</div>
                        </div>
                    </div>
                ))
                }
            </article>
        </>
    );
}

