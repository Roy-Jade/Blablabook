import { useState} from "react";
import api from "../../../api/api.js";

export function useChangePassword() {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (newInfo, password) => {
        setMessage("");
        setIsLoading(true);

        try {
            const response = await api.patch('/auth/edit/password', { field:"password", newInfo, password });
            setMessage("Votre mot de passe a été modifié avec succès !")

        } catch (error) {
            setMessage(error?.response?.data?.message || "Une erreur est survenue")
        } finally {
            setIsLoading(false);
        }
    }

    return {handleSubmit, message, isLoading}
}