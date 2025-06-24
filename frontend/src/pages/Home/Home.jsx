import {Link} from 'react-router';
// On importe notre [Composant].scss
import BookMinis from '../../components/BookMinis/BookMinis';
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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eveniet labore exercitationem ab aliquid dicta laborum autem maxime aperiam, accusamus quos ducimus, minus consequuntur! Temporibus in perspiciatis recusandae. Laborum, veritatis.
            Sunt, possimus. Dolorem minima veritatis iure exercitationem voluptas iusto omnis ad eligendi ab ea quam eos, officia labore vero enim at porro vel error corporis, similique rerum laboriosam! Officia, enim?
            Consectetur praesentium consequatur, exercitationem nihil itaque provident dolor sint nobis a fugiat molestiae illum tempora sit laboriosam. Nihil sint quisquam adipisci. Dolore dolores molestias vero, pariatur voluptatum culpa harum unde?
            </p>
            <h2>Notre sélection</h2>

            <section className='carousel'>
                <BookMinis book="9782266114042" />
            </section>

            <Link className='button button_big' to="/register">S'inscrire</Link>

            {/* Finir de modifier ici */}
        </>
    )
}