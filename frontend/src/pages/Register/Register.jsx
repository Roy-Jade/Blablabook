import { Link } from "react-router";

export default function Register() {
    return (
      <div>
        <h1>Créer un compte</h1>
        <form>
          <div>
            <label htmlFor="pseudo">Pseudo</label>
            <input type="text" id="pseudo" name="pseudo"  placeholder="exemple: MariziaBook" required/>
          </div>
  
          <div>
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email"  placeholder="exemple: Marizia99@gmail.com" required/>
          </div>
  
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="nouha@2021" required />
          </div>
  
          <div>
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="nouha@2021" required />
          </div>
  
          <div>
            <label htmlFor="terms">
              <input type="checkbox" id="terms" name="terms" required/>
              J'accepte les termes et les conditions
            </label>
          </div>
  
          <button type="submit">S'inscrire</button>
  
          <p>
            Déjà un compte ?
            <Link to="/login" >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    );
  }
  