// On importe notre [Composant].scss
import './Sort.scss';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function Sort() {
    return(
        <div className='search-sort'>
            <section>
                <h2 className='search-sort__title'>Recherche</h2>
                <form action="">
                    <div>
                        <label htmlFor="title">Titre : </label>
                        <input type="text" id='title' name='title' />
                    </div>
                    <div>
                        <label htmlFor="author">Auteur : </label>
                        <input type="text" id='author' name='author' />
                    </div>
                </form>
            </section>
            <section>
                <h2 className='search-sort__title'>Tri</h2>
                <form>
                    <input type="radio" id='a-z-title' name='sort' value='Titre - A à Z'/>
                    <label htmlFor="a-z-title">Titre - A à Z</label>
                    <input type="radio" id='z-a-title' name='sort' value='Titre - Z à A' />
                    <label htmlFor="z-a-title">Titre - Z à A</label>
                    <input type="radio" id='a-z-author' name='sort' value='Auteur - A à Z' />
                    <label htmlFor="a-z-author">Auteur - A à Z</label>
                    <input type="radio" id='z-a-author' name='sort' value='Auteur - Z à A' />
                    <label htmlFor="z-a-author">Auteur - Z à A</label>
                    <input type="radio" id='page-up' name='sort' value='Nombre de page croissante' />
                    <label htmlFor="page-up">Nombre de page croissante</label>
                    <input type="radio" id='page-down' name='sort' value='Nombre de page décroissante' />
                    <label htmlFor="page-down">Nombre de page décroissante</label>
                </form>
            </section>
        </div>
    )
}