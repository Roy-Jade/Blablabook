import './Rating.scss'

export default function Rating({rate}) {
    const numberedRate = rate ? Number(rate) : 0;

    return (
        <p className='rating' aria-label={`Note : ${numberedRate} sur 5`} style={{'--rate' : `${ (numberedRate / 5 ) *100}%`}}>
            <span className="rating-empty">☆☆☆☆☆</span>
            <span className="rating-full">★★★★★</span>
            <span className="visually-hidden">{numberedRate} étoiles sur 5</span>
        </p>
    )
}