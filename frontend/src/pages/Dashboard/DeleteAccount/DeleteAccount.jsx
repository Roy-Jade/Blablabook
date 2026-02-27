import './DeleteAccount.scss'
import { useState } from "react";
import { useNavigate } from "react-router";

export default function DeleteAccount({onSubmit, message, isLoading, isDeleted}) {
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const toggleDeleteAccount = () => {
        const confirmation = window.confirm(
        "Êtes-vous sûr(e) de vouloir supprimer définitivement votre compte BlablaBook ? Cette action est irréversible.\n\nToutes vos données personnelles seront supprimées immédiatement : pseudonyme, email, livres ajoutés, préférences de lecture, bibliothèques.\n\nConformément au RGPD, cette suppression est totale et aucun retour ne sera possible."
        );

        if (!confirmation) return; // L'utilisateur a annulé
        setShowDeleteAccount(!showDeleteAccount);
        return
    };

    const handleSubmit= async () => {

        await onSubmit(password);
        setPassword("");
        
        if(isDeleted) {
            setTimeout(() => {
            navigate('/');
            }, 5000); //
        }
    };

return (
    <section className='dashboard-delete'>
        
        <button className="button-delete button " disabled={isDeleted} onClick={toggleDeleteAccount}>{isDeleted? "Compte supprimé" : "Supprimer le compte"}</button>

        {showDeleteAccount && (
            <form >
                <fieldset>
                    <label htmlFor='password'>Entrez votre mot de passe pour confirmer la suppression</label>
                    <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                </fieldset>
                <button
                    className="button button_medium button-delete"
                    type="submit"
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    {isLoading ? "Suppression en cours" : "Supprimer définitivement le compte"}
                </button>
            </form>

        )}
    </section>
)
};