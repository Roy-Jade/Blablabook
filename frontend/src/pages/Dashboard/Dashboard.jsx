import { useState, useContext } from "react";
import { Link } from "react-router";
import { Helmet } from 'react-helmet';
import './Dashboard.scss'
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import ChangeInfos from "./ChangeInfos/ChangeInfos";
import { useChangeInfo } from "./ChangeInfos/useChangeInfo.js";
import { useChangePassword } from "./ChangeInfos/useChangePassword.js";
import DeleteAccount from "./DeleteAccount/DeleteAccount.jsx";
import { useDeleteAccount } from "./DeleteAccount/useDeleteAccount.js";

export default function Dashboard() {


  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [message, setMessage] = useState(null);

  const changePseudonymeHook = useChangeInfo("pseudonyme");
  const changeEmailHook = useChangeInfo("email");
  const changePasswordHook = useChangePassword();
  const deleteAccountHook = useDeleteAccount();

  return (
    <>
      <Helmet>
        <title>Tableau de bord - BlablaBook</title>
        <meta name='description' content="Gérez votre compte BlablaBook : modifiez votre email, mot de passe ou supprimez votre compte facilement depuis votre tableau de bord."></meta>
      </Helmet>
      <h1>Paramètre utilisateur</h1>
      {message && <p>{message}</p>}

      <ChangeInfos 
        infoType="pseudonyme" 
        info={currentUser.pseudonyme} 
        onSubmit={changePseudonymeHook.handleSubmit}
        message={changePseudonymeHook.message}
        isLoading={changePseudonymeHook.isLoading} />
      <ChangeInfos 
        infoType="email" 
        info={currentUser.email} 
        onSubmit={changeEmailHook.handleSubmit}
        message={changeEmailHook.message}
        isLoading={changeEmailHook.isLoading} />
      <ChangeInfos 
        infoType="password" 
        info="**********" 
        onSubmit={changePasswordHook.handleSubmit}
        message={changePasswordHook.message}
        isLoading={changePasswordHook.isLoading}
        isConfirmationRequired={true} />

      {/* <Link to="/dashboard/options">Changer les paramètres de partage</Link> */}

      <DeleteAccount
        onSubmit={deleteAccountHook.handleSubmit}
        message={deleteAccountHook.message}
        isLoading={deleteAccountHook.isLoading}
        isDeleted={deleteAccountHook.isDeleted} />

    </>
  )
}
