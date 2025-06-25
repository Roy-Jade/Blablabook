import {Link} from 'react-router';
// Import du [Composant].scss
import './Contact.scss';

export default function Contact() {
  return(
    <>
      <h1>Nous contacter</h1>

      <p className='contact_alert hidden'>Votre message a bien été envoyé</p>

      <form className='contact__form' method="get" action="gestionDesEmail.html" >

        <div>
            <label className='label_title' htmlFor="prenom">Prénom *</label>
            <input type="text" name="" id="prenom" placeholder="exemple : Marie" required/>
        </div>

        <div>
            <label className='label_title' htmlFor="name">Nom *</label>
            <input type="text" name="" id="name" placeholder="exemple : Dupont" required/>
        </div>

        <div>
            <label className='label_title' htmlFor="email">Adresse E-mail *</label>
            <input type="email" name="email" id="email" placeholder="Exemple : marie@dupont.com" required/>
        </div>

        <div>
            <label className='label_title' htmlFor="notes">Message *</label>
            <textarea name="notes" id="notes" rows="20" cols="20" required />
        </div>

        <div className='contact__form__checkbox'>
            <input type="checkbox" name="valid" id="valid"/>
            <label htmlFor="valid">J'accepte que mes données soient traitées conformément à la <Link className='text_link' to="/terms">politique de confidentialité</Link></label>
        </div>
        
        {/*La soumission du formulaire renvoie vers un serveur distant, en charge de la gestion des emails, qui n'est pas prévu dans le projet actuel*/}
        <button className='button button_big' classe="btn"  type="submit">Envoyer</button>

      </form>
    </>
  )
}