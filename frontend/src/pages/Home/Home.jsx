// On importe notre [Composant].scss
import './Home.scss';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function Home() {
    return(
        <>
            {/* Commencer à modifier ici */}
            <h1>Votre prochaine lecture vous attend</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora magnam eveniet ea! Harum dolores aspernatur sit adipisci officiis, tempore cupiditate debitis consequatur, est quae neque, quod error veniam et consequuntur.
            </p>
            <h2>Notre sélection</h2>

            {/*Carrousel : composant BookPreview qui sera dynamisé ultérieurement}
            <BookPreview/>
            */}

            <div>
            {/*Ancre dans href en attendant d'avoir le chemin exact de la page /library/bookID lorsqu'elle sera créée et class btn en attendant d'avoir le SCSS relatif*/}
            <a classe="btn" href="#">voir le détail</a>
              </div> 

            {/* Finir de modifier ici */}
        </>
    )
}