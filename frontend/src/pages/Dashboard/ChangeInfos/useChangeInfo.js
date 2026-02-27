import { useContext, useState} from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import api from "../../../api/api.js";

export function useChangeInfo(info) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (newInfo, password) => {
        setMessage("");
        setIsLoading(true);

        try {
            const response = await api.patch('/auth/edit/user', { field:info, newInfo, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            setCurrentUser(response.data.user);
            setMessage("Votre "+info+" a été modifié avec succès !")

        } catch (error) {
            setMessage(error?.response?.data?.message || "Une erreur est survenue")
        } finally {
            setIsLoading(false);
        }
    }

    return {handleSubmit, message, isLoading}
}