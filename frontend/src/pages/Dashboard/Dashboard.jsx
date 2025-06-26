import { useState } from "react";
import { Link } from "react-router";

export default function Dashboard(){

    const [email, setEmail] = useState("ze-super-lecteur@book.com");
    const [showEmailSection, setShowEmailSection] = useState(false);
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [confirmEmail, setConfirmEmail]= useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null); 
    const [deletePassword, setDeletePassword] = useState("");
    const [isAccountDeleted, setIsAccountDeleted] = useState(false);

    const handleEmailChange = ()=>{
        if(! currentEmail || ! newEmail || !confirmEmail) {
            setMessage('Veuillez remplir tous les champs.');
            return;

        }
        if(currentEmail !== email){
            setMessage('L\'ancien email ne correspond pas.');
            return;
        }
        if( newEmail !== confirmEmail){
            setMessage('Les emails ne correspondent pas.');
            return;
        }
        setEmail(newEmail);
        setMessage('L’email a été changé avec succès !');
        setCurrentEmail("");
        setNewEmail("");
        setConfirmEmail("");

        

    }
    const handlePasswordChange = ()=>{
        if(!currentPassword || !newPassword || !confirmPassword){
            setMessage('Veuillez remplir tous les champs.');
            return;
        }
        if(newPassword !== confirmPassword){
            setMessage('Les mots de passe ne correspondent pas');
            return;
        }

        setMessage('Mot de passe a bien été changé !');
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }
    const handleDeleteCompte = ()=>{
        if(!showDeleteAccount) {
            alert("Attention : La suppression de compte est définitive. Toutes les informations relatives à votre compte seront supprimées. Votre mot de passe est nécessaire pour confirmer cette action.");
            setShowDeleteAccount(true);
            return;

        }
        if(!deletePassword){
            setMessage("Veuillez entrer votre mot de passe pour confirmer la suppression.");
            return;
        }
        
        setIsAccountDeleted(true);
        setMessage("Votre compte a bien été supprimé.");
        setDeletePassword("");
        setShowDeleteAccount(false);

    }
   
    if (isAccountDeleted) {
        return (
          <div>
            Votre compte a bien été supprimé.
          </div>
        );
      }
      
    return(
        <>
        <h1>Paramètre utilisateur</h1>
         {message && (
            <div style={{backgroundColor: "#f0f0f0", padding: "10px"}}>
                {message}
            </div>
         )}
        <div>
            Pseudonyme utilisateur
            <p>xXx_SuperLecteur_xXx</p>
        </div>

        <div>
            Email utilisateur
            <p>{email}</p>
            <button type="button" onClick={()=> setShowEmailSection(!showEmailSection)}>Changer l'email</button>

            {showEmailSection && (
                <section>
                    <div>
                    <input type="email" name="currentEmail" placeholder="Ancien mail" onChange={(e) => setCurrentEmail(e.target.value)}/>
                    </div>
                    <div>
                    <input type="email" name="newEmail" placeholder="Nouveau mail" onChange={(e) =>setNewEmail(e.target.value)}/>
                    </div>
                    <div>
                    <input type="email" name="confirmEmail" placeholder="Confirmer le mail" onChange={(e) =>setConfirmEmail(e.target.value)}/>
                    </div>
                    <button type="submit" onClick={handleEmailChange}>Confirmer le changement</button>
                </section>
            )}
        </div>
        <div>
            <button type="button" onClick={()=>setShowPasswordSection(!showPasswordSection)}>Changer le mot de passe</button>
            {showPasswordSection && (
                <section>
                    <p>*Règles de rédaction de mot de passe</p>
                    <div>
                    <input type="password" name="currentPassword" placeholder="Ancien mot de passe" onChange={(e) => setCurrentPassword(e.target.value)}/>
                    </div>
                    <div>
                    <input type="password" name="newPassword" placeholder="Nouveau mot de passe" onChange={(e) =>setNewPassword(e.target.value)}/>
                    </div>
                    <div>
                    <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" onChange={(e) =>setConfirmPassword(e.target.value)}/>
                    </div>
                    <button type="submit" onClick={handlePasswordChange}>Confirmer le changement</button>
                </section>
            )}
        </div>
        <div>
            <Link to="/dashboard/options">Changer les paramètres de partage</Link>
        </div>
        <div>
            {showDeleteAccount && (
            <input type="password" value={deletePassword} placeholder="Entrez votre mot de passe pour confirmer" onChange={(e)=> setDeletePassword(e.target.value)}/>
            )}
            {!isAccountDeleted &&(
            <button type="submit" style={{ backgroundColor: "red" }} onClick={handleDeleteCompte}>Supprimer le compte</button>
            )}
            </div>
        </>
    )
}
    