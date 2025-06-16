import './Auth.scss';

export default function Logout() {
  return (
    <div className="auth-container">
      <h1>Vous avez été déconnecté avec succès</h1>
      <a href="/login">
        <button>Se connecter</button>
      </a>
    </div>
  );
}
