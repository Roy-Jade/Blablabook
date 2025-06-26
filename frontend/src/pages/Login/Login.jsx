import { Link } from "react-router";
// Import du [Composant].scss
import './Login.scss';

export default function Login() {
    return (
      <div>
        <h1>Connexion</h1>
        <form>
  
          <div>
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email" placeholder="exemple: Marizia99@gmail.com" required/>
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="nouha@2021" required/>
          </div>
          <div>
            <a
            href="#"
            onClick={(e) =>{
                e.preventDefault();
                window.alert("Lien de réinitialisation du mot de passe envoyé à votre adresse e-mail.");
            }}
            >
            Mot de passe oublié ?
            </a>
          </div>
  
          <div>
            <label htmlFor="terms">
              <input type="checkbox" id="terms" name="terms" />
              Se souvenir de moi
            </label>
          </div>
  
          <button type="submit">Se connecter</button>
  
        </form>
      </div>
    );
  }
  