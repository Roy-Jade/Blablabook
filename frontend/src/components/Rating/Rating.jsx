export default function Rating({rate}) {
    // Le composant prend la valeur "rate" qui lui est donné, et définit un string contenant autant d'étoiles pleines que la valeur "rate", avant de compléter avec des étoiles vides jusqu'à 5 caractères.
    let displayedRate = ""
    for (let i=1; i<=rate; i++) {
        displayedRate +="★"
    }
    for (let i=5; i>rate; i--) {
        displayedRate += "☆"
    }

    // Il affiche ensuite le string obtenu
    return (
        <>{displayedRate}</>
    )
}