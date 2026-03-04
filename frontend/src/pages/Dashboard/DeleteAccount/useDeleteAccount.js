import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext.js";
import api from "../../../api/api.js";

export function useDeleteAccount() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false)

    const handleSubmit = async (password) => {
        setMessage("");
        setIsLoading(true);

        try {
            await api.delete("/auth/delete", {data: {password:password}});
            localStorage.removeItem("currentUser");
            setCurrentUser(null);
            setIsDeleted(true)
            setMessage("Votre compte a été supprimé avec succès !")

        } catch (error) {
            setMessage(error?.response?.data?.message || "Une erreur est survenue")
        } finally {
            setIsLoading(false);
        }
    }

    return {handleSubmit, message, isLoading, isDeleted}
}