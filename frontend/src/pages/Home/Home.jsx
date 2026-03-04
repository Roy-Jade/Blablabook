import {Link} from 'react-router';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import Carousel from '../../components/Carousel/Carousel';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import './Home.scss';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Home() {

    const {currentUser} = useContext(CurrentUserContext)

    return(
        <>
            <Helmet>
                <title>Accueil - BlablaBook</title>
                <meta name='description' content='Trouvez votre livre préféré'></meta>
            </Helmet>
            
            <h1>Votre prochaine lecture vous attend</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eveniet labore exercitationem ab aliquid dicta laborum autem maxime aperiam, accusamus quos ducimus, minus consequuntur! Temporibus in perspiciatis recusandae. Laborum, veritatis.
            Sunt, possimus. </p>
            <h2>Notre sélection</h2>

            <Carousel />

            {!currentUser && <Link className='button button_big' to="/register">Je me connecte !</Link>}
        </>
    )
}