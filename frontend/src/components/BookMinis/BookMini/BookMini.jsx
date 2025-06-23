// On importe notre [Composant].scss
import './BookMini.scss';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function BookMini() {
    return(
        <article className='bookmini'>
            <img className='bookmini__img' src="//:0" alt="Couverture du livre" />
            <h2 className='bookmini__title'>Le titre</h2>
            <address className='bookmini__author'> L'auteur</address>
            <div className='bookmini__note'>&#9733; &#9733; &#9733; &#9733; &#9734;</div>
            <button className='button_small'>Voir le détail</button>
            <div className='connected owned'>
                <input type="checkbox" id='isRead' name='isRead'/>
                <label htmlFor="isRead">Lu</label>
                <input type="checkbox" id='isShared' name='isShared'/>
                <label htmlFor="isShared">Partagé</label>
            </div>
            <button className='button_small connected not_owned'>Ajouter</button>
        </article>
    )
}