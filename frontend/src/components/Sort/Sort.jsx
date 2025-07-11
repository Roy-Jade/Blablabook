// On importe notre [Composant].scss
import './Sort.scss';
import { useState, useEffect, useCallback } from 'react';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function Sort({search, setSearch, newResearch}) {

    const [showSortOptions, setShowSortOptions] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    const handleWindowResize = useCallback(event => {
        setWindowSize(window.innerWidth);
    }, []);
    
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [handleWindowResize]);

    const toggleSortOptions = () => {
        if (showSortOptions == true) {
            setShowSortOptions(false)
        } else {setShowSortOptions(true)}
    }

    return(
        <div className='search-sort'>
            {windowSize<992 && <button className='button button_big' onClick={toggleSortOptions}>Tri et recherche</button>}
            {(windowSize>=992 || showSortOptions) && <>
                <section className='search'>
                    <h2 className='search-sort__title'>Recherche :</h2>
                    <form onSubmit={newResearch}>
                        <fieldset>
                            <label className='text_semi-bold' htmlFor="title">Titre : <input onChange={e => {setSearch([e.target.value, "titre"])}} type="text" id='title' name='title' /></label>
                        </fieldset>
                        <p>ou</p>
                        <fieldset>
                            <label className='text_semi-bold' htmlFor="author">Auteur : <input onChange={e => setSearch([e.target.value, "auteur"])} type="text" id='author' name='author' /></label>
                            
                        </fieldset>
                        <button className='button button_small'>Rechercher</button>
                    </form>
                </section>
                <section className='sort'>
                    <h2 className='search-sort__title'>Trier par :</h2>
                    <form>
                        <fieldset>
                            <input type="radio" id='a-z-title' name='sort' value='Titre - A à Z' defaultChecked/>
                            <label htmlFor="a-z-title">Titre - A à Z</label>
                        </fieldset>
                        <fieldset>
                            <input type="radio" id='z-a-title' name='sort' value='Titre - Z à A' />
                            <label htmlFor="z-a-title">Titre - Z à A</label>
                        </fieldset>
                        <fieldset>
                            <input type="radio" id='a-z-author' name='sort' value='Auteur - A à Z' />
                            <label htmlFor="a-z-author">Auteur - A à Z</label>
                        </fieldset>
                        <fieldset>
                            <input type="radio" id='z-a-author' name='sort' value='Auteur - Z à A' />
                            <label htmlFor="z-a-author">Auteur - Z à A</label>
                        </fieldset>
                        <fieldset>
                            <input type="radio" id='page-up' name='sort' value='Nombre de pages' />
                            <label htmlFor="page-up">Nombre de pages</label>
                        </fieldset>
                        {/* <fieldset>
                            <input type="radio" id='page-down' name='sort' value='Pages décroissante' />
                            <label htmlFor="page-down">Pages décroissante</label>
                        </fieldset> */}
                    </form>
                </section>
            </>}
        </div>
    )
}