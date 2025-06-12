// On importe notre [Composant].scss
import BookMini from '../../components/BookMini/BookMini';
import Sort from '../../components/Sort/Sort';
import './Library.scss';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function Library() {
    return(
        <>
            {/* Commencer à modifier ici */}
            <h1>Bibliothèque</h1>
            <Sort/>
            <BookMini/>
            {/* Finir de modifier ici */}
        </>
    )
}