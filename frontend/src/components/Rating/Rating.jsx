export default function Rating({rate}) {
    const numberedRate = rate ? Number(rate) : 0;
    // Le composant prend la valeur "rate" qui lui est donné, et définit un string contenant autant d'étoiles pleines que la valeur "rate", avant de compléter avec des étoiles vides jusqu'à 5 caractères.
    let displayedRate = ""
    for (let i=1; i<=numberedRate; i++) {
        displayedRate +="★"
    }
    for (let i=5; i>numberedRate; i--) {
        displayedRate += "☆"
    }

    // Il affiche ensuite le string obtenu
    return (
        <div className='bookmini__note' aria-label={`Note : ${numberedRate} sur 5`}>
            <span className="visually-hidden">{numberedRate} étoiles sur 5</span>
            {displayedRate}
        </div>
    )
}