export default function Rating({rate}) {
    let displayedRate = ""
    for (let i=1; i<=rate; i++) {
        displayedRate +="★"
    }
    for (let i=5; i>rate; i--) {
        displayedRate += "☆"
    }

    return (
        <>{displayedRate}</>
    )
}