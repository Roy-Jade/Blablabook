import { useContext } from "react";
import { Navigate } from "react-router";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ProtectedRoute({children, path = "/login", isCurrentUserLoading}) {
    // On récupère le currentUser
    const { currentUser } = useContext(CurrentUserContext);

    // Si le currentUser est en récupération à la connexion, on ne redirige pas encore
    if (isCurrentUserLoading) {
        return null
    }

    // Si aucun utilisateur n'est connecté, on renvoie vers le chemin cible
    if (!currentUser) {
        return <Navigate to={path} replace />
    }

    // Sinon, on envoie bien vers le chemin demandé
    return children
}