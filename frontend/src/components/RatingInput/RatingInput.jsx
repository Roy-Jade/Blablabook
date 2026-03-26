import './RatingInput.scss'
import { useEffect, useState, Fragment } from 'react'
import api from '../../api/api';

export default function RatingInput({bookID, userRate, setUserRate}) {
    const [hoverRate, setHoverRate] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Récupération de la note de l'utilisateur pour ce livre
        const fetchUserRate = async() => {
            try {
                const response = await api.get(`/book/${bookID}/user-rate`);
                setUserRate(response.data.userRate);
                setMessage(response.data.message)
            } catch(error) {
				// En cas d'erreur, on enregistre le message d'erreur
				setMessage(error?.response?.data?.message);
            }
        }

        fetchUserRate();
    }, [])

    const handleRate = async (rateValue) => {
        setMessage("");
        setUserRate(rateValue)
        try {
            await api.patch(`/book/${bookID}/user-data`, {field : "rate", newData : rateValue})
        } catch(error) {
            // En cas d'erreur, on enregistre le message d'erreur
            setMessage(error?.response?.data?.message);
        }
    }

    const handleReset = async () => {
        setMessage("");
        setUserRate(null);
        try {
            await api.patch(`/book/${bookID}/user-data`, {field : "reset_rate", newData : null})
            // setMessage(response.data.message)
        } catch(error) {
            setMessage(error?.response?.data?.message);
        }
    }

    return (
        <>
            <fieldset className='rating-input' onMouseLeave={() => setHoverRate(null)}>
                <legend >À quel point recommanderiez-vous ce livre ?</legend>
                {[1,2,3,4,5].map(value => (
                    <Fragment key={value}>
                    <input 
                        type="radio" 
                        className="visually-hidden"
                        id={`star-${value}`}
                        name="rating"
                        value={value}
                        checked={userRate === value}
                        onChange={() => handleRate(value)}
                    />
                    <label htmlFor={`star-${value}`} onMouseEnter={() => setHoverRate(value)} className={(hoverRate ?? 0) >= value ? 'star-hovered' : ''}>
                        <span className="visually-hidden">{value} étoiles</span>
                        {(userRate ?? 0) >= value ? "★" : "☆"}
                    </label>
                    </Fragment>
                ))}
            </fieldset>
            <button onClick={handleReset} >Réinitialise ta note</button>
        </>
    )
}