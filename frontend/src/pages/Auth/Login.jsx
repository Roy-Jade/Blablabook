import './Auth.scss';

export default function Login() {
  return (
    <div className="auth-container">
      <h1>Connexion</h1>
      <form>
        <input type="email" placeholder="Adresse e-mail" required />
        <input type="password" placeholder="Mot de passe" required />

        <label>
          <input type="checkbox" /> Se souvenir de moi
        </label>

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
