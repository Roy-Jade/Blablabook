export default function Register() {
    return (
      <div>
        <h1>Créer un compte</h1>
        <form>
          <div>
            <label htmlFor="pseudo">Pseudo</label>
            <input type="text" id="pseudo" name="pseudo" />
          </div>
  
          <div>
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" name="email" />
          </div>
  
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" name="password" />
          </div>
  
          <div>
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input type="password" id="confirmPassword" name="confirmPassword" />
          </div>
  
          <div>
            <label htmlFor="terms">
              <input type="checkbox" id="terms" name="terms" />
              J'accepte les termes et les conditions
            </label>
          </div>
  
          <button type="submit">S'inscrire</button>
  
          <p>
            Déjà un compte ?
            <button type="submit" >
              Se connecter
            </button>
          </p>
        </form>
      </div>
    );
  }
  