import {Link} from 'react-router';
// Import du [Composant].scss
import './Contact.scss';

export default function Contact() {
    return(
        <>
            <h1>Nous contacter</h1>

            <form method="get" action="gestionDesEmail.html" >

            <div>
                <label htmlFor="prenom">Prénom</label>
                <input type="text" name="" id="prenom" placeholder="exemple : Marie" required/>
            </div>

            <div>
                <label htmlFor="name">Nom *</label>
                <input type="text" name="" id="name" placeholder="exemple : Dupont" required/>
            </div>

            <div>
                <label htmlFor="email">Adresse E-mail *</label>
                <input type="email" name="email" id="email" placeholder="Exemple : marie@dupont.com" required/>
            </div>

            <div>
                <label htmlFor="notes">Message *</label>
                <textarea name="notes" id="notes" rows="20" cols="20"></textarea>
            </div>

            <div>
                <input type="checkbox" name="valid" id="valid"/>
                <label htmlFor="valid">J'accepte que mes données soient traitées conformément à la <Link to="/terms">politique de confidentialité</Link></label>
            </div>


             <div>
            {/*La soumission du formulaire renvoie vers un serveur distant, en charge de la gestion des emails, qui n'est pas prévu dans le projet actuel*/}
            <button classe="btn"  type="submit">Envoyer</button>
              </div> 
              <div>
                <input type="checkbox" name="valid" id="valid"/>
                <label htmlFor="valid">Votre message a bien été envoyé</label>
            </div>

         </form>
        </>
    )
}