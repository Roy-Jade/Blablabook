import { Link } from "react-router"
import Footer from "../Footer/Footer"
export default function About(){
    return(
    <div>
        <h1>À propos</h1>
        <section>
        <h2>Notre Mission</h2>
        <p>
        BlaBlaBook est une plateforme qui vise à réunir tous les amoureux de la lecture autour d’un espace personnel et communautaire. 
        Notre mission est de faciliter la gestion de sa bibliothèque personnelle tout en découvrant et partageant de nouveaux livres.
        </p>
        <p>
        Grâce à une interface intuitive, les utilisateurs peuvent suivre leurs lectures, chercher de nouveaux ouvrages, donner leur avis et dialoguer avec d'autres passionnés.
        </p>
        </section>
        <section>
        <h2>Qui sommes-nous ?</h2>
        <p>
        Nous sommes une équipe de cinq passionnés de développement web , réunis autour d’un projet commun : BlablaBook, une plateforme collaborative dédiée aux amoureux des livres.
        </p>
        <p><strong>L'equipe: </strong></p>
        <ul>
            <li><strong>Product Owner :</strong> Marizia</li>
            <li><strong>Scrum Master :</strong> Grégoire</li>
            <li><strong>Lead Devs :</strong> Geneviève, Nouhayla, Nicolas</li>
        </ul>
        </section>
        <section>
        Pour en savoir plus sur nos services, consultez la page{" "}
        <Link to="/contact">
          Contact
        </Link>
        </section>
    </div>
    );
}