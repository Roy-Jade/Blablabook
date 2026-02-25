import { useState, useContext } from "react";
import { Link } from "react-router";
import { Helmet } from 'react-helmet';
import './Dashboard.scss'
import { useNavigate } from "react-router";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import api from "../../../api";
import ChangeInfos from "./ChangeInfos/ChangeInfos";

export default function Dashboard() {


  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [email, setEmail] = useState(null);
  const [showEmailSection, setShowEmailSection] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = () => {
    if (!newEmail || !confirmEmail) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    if (newEmail !== confirmEmail) {
      setMessage('Les emails ne correspondent pas.');
      return;
    }

    setEmail(newEmail);
    setMessage('L’email a été changé avec succès !');
    setNewEmail("");
    setConfirmEmail("");
  }

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas');
      return;
    }

    setMessage('Mot de passe a bien été changé !');
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  const handleDeleteCompte = async () => {
    if (!showDeleteAccount) {
      const confirmation = window.confirm(
        "⚠️ Êtes-vous sûr(e) de vouloir supprimer définitivement votre compte BlablaBook ? Cette action est irréversible.\n\nToutes vos données personnelles seront supprimées immédiatement : pseudonyme, email, livres ajoutés, préférences de lecture, bibliothèques.\n\nConformément au RGPD, cette suppression est totale et aucun retour ne sera possible."
      );

      if (!confirmation) return; // ❌ L'utilisateur a annulé

      setShowDeleteAccount(true);
      return;
    }


    if (!deletePassword) {
      setMessage("Veuillez entrer votre mot de passe pour confirmer la suppression.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Utilisateur non authentifié. Veuillez vous reconnecter.");
      return;
    }

    try {
      const response = await api.delete("/auth/delete");
      console.log("Suppression du compte effectuée en back")
      setIsAccountDeleted(true);
      localStorage.clear();
      setCurrentUser(null); // ← déconnexion réelle (état global)
      setMessage("✅ Votre compte et toutes vos données personnelles ont été supprimés définitivement, conformément au RGPD.");

      setTimeout(() => {
        navigate('/');
      }, 5000); //
    } catch (error) {
      setMessage(`❌ Erreur : ${error.response?.data?.message || "❌ Erreur lors de la suppression du compte."}`);
      console.error(error);
    }
  };


  return (
    <>
      <Helmet>
        <title>Tableau de bord - BlablaBook</title>
        <meta name='description' content="Gérez votre compte BlablaBook : modifiez votre email, mot de passe ou supprimez votre compte facilement depuis votre tableau de bord."></meta>
      </Helmet>
      <h1>Paramètre utilisateur</h1>
      {message && (
        <div style={{ backgroundColor: "#f0f0f0", padding: "10px" }}>
          {message}
        </div>
      )}
      <div className="Pseudo-user">
        <p>Pseudonyme utilisateur</p>
        <p>{currentUser}</p>
      </div>

      <div className="Email-user">
        <p>Email utilisateur</p>
        <p>{email}</p>
      </div>

      <ChangeInfos infoType="pseudonyme" info={currentUser} />
      <ChangeInfos infoType="email" info={email} />
      <ChangeInfos infoType="password" info="**********" />

      <div>
        <Link to="/dashboard/options">Changer les paramètres de partage</Link>
      </div>
      <div>
        {showDeleteAccount && (
          <input
            type="password"
            value={deletePassword}
            placeholder="Entrez votre mot de passe pour confirmer la suppression"
            onChange={(e) => setDeletePassword(e.target.value)}
          />
        )}
        {!isAccountDeleted && (
          <button
            className="button button_medium"
            type="submit"
            style={{ backgroundColor: "red" }}
            onClick={handleDeleteCompte}
          >
            Supprimer le compte
          </button>
        )}
      </div>
    </>
  )
}
