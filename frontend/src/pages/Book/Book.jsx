import { Link } from 'react-router';
// Import du [Composant].scss
import './Book.scss';
//import { Component } from 'react';

export default function Book({ISBN}, {title}, {author}, {publication_date}, {resume}, {item}) {
    const comments = [
        {
            pseudonyme: "RatBiblio",
            date: "01/06/2025",
            note: "&#9733, &#9733, &#9733, &#9733; &#9733",
            comment: "J'ai adoré l'ambiance de ce roman, ce monde dytopique ou le héros met fin à cette société deshumanisée "
        },
        {
            pseudonyme: "BookAddict",
            date: "15/05/2025",
            note: "&#9733, &#9733, &#9733, &#9733; &#9733",
            comment: "Thème d'une société où l'on decide absolument de tout pour vous : choix entre 4 prenoms, boulot attribué d'office , relations sexuelles controlées. Ici, le monde est gouverné par un super-ordinateur, et les êtres humains subissent une uniformisation grâce à un traitement hormonal qui supprime toute violence, mais aussi toute volonté. Le fun quoi !!!  "
        },
        {
            pseudonyme: "JMlire",
            date: "25/02/2025",
            note: "&#9733, &#9733, &#9733, &#9733; &#9733",
            comment: "Ce roman, bien qu'ayant vieilli, décrit une société où les ordinateurs ont pris le pouvoir sur l'humanité, on s'y croirait"
        },
        {
            pseudonyme: "ToutLire",
            date: "01/04/2025",
            note: "&#9733, &#9733, &#9733, &#9733; &#9734",
            comment: "On a pas du tout envie de quitter Copeau, et le suspense est maintenu jusqu'au bout  "
        },
    ];

    return (
        <>
            <h1>Détail du livre</h1>

            {/*La source de l'image non configuré pour l'instant sera l'API cover de open library*/}
            <img src="" alt="Book's cover" />

            {/*Props qui seront alimentés par l'API de la BDD*/}
            {ISBN}
            {title}
            {author}
            {publication_date}
            {resume}

            {/* Composant permettant l'affichage du carrousel identique à la page d'accueil */}
            <BookMini />

            {/* notes correspondant à 4.5/5 dont une étoile diamant pleine gauche*/}
            <p>Moyenne des notes &#11088; &#11088; &#11088; &#11088;| &#10025;</p>
            <button><Link to="/personnalLibrary">Ajouter à mes livres</Link></button>

            <h2>Commentaires</h2>

            {comments.map((item, index) => (
                <div key={index}>
                    <div></div>

                </div>


            ))

            }







        </>
    )
}

