import { Link } from "react-router";
import "./Register.scss";

export default function Register() {
    return (
      <>
        <h1>Créer un compte</h1>
        <form className="register__form">
          <fieldset>
            <label className='label_title' htmlFor="pseudo">Pseudo</label>
            <input type="text" id="pseudo" name="pseudo"  placeholder="exemple: MariziaBook" required/>
          </fieldset>
  
          <fieldset>
            <label className='label_title' htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email"  placeholder="exemple: Marizia99@gmail.com" required/>
          </fieldset>
  
          <fieldset>
            <label className='label_title' htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="Minimum : 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial" required />
          </fieldset>
  
          <fieldset>
            <label className='label_title' htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />
          </fieldset>
  
          <fieldset>
            <label htmlFor="terms">
              <input type="checkbox" id="terms" name="terms" required/>
              J'accepte les termes et les conditions
            </label>
          </fieldset>
  
          <button className="button button_big" type="submit">S'inscrire</button>
  
          <Link className="text_link" to="/login" >
            Déjà un compte ?
            </Link>
        </form>
      </>
    );
  }
  