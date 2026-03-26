import { useState } from "react";
import './Commentary.scss';
import api from "../../api/api.js";

export default function Commentary({bookID, userCommentary, setUserCommentary, handleCommentarySubmission}) {

    const [message, setMessage] = useState("");

    const sendCommentary = async() => {
        setMessage("")
        try {
            const response = await api.patch(`/book/${bookID}/user-data`, { field : "commentary", newData: userCommentary });
            // setMessage(response.data.message)
            handleCommentarySubmission("create")
        } catch (error) {
            setMessage(error?.response?.data?.message || "Une erreur est survenue")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        sendCommentary()
    }

    const handleReset = async () => {
        setMessage("");
        setUserCommentary("");
        handleCommentarySubmission("delete")
        try {
            const response = await api.patch(`/book/${bookID}/user-data`, { field : "reset_commentary" });
            // setMessage(response.data.message)
        } catch(error) {
            setMessage(error?.response?.data?.message || "Une erreur est survenue");
        }
    }

    return (
        <>
            <form className="commentary" onSubmit={handleSubmit}>
                { message && <p>{message}</p> }
                <label htmlFor="commentary">Dites-nous pourquoi : qu'est-ce que ce livre vous a inspiré ?</label>
                <textarea id="commentary" name="commentary" onChange={(e) => setUserCommentary(e.target.value)} value={userCommentary} ></textarea>
                <button className="button button-small" type="submit">Soumettre votre avis</button>
            </form>
            <button onClick={handleReset} >Efface ton commentaire</button>
        </>
    )
}