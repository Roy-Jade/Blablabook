export default function PolitiqueConfidentialite({ sections }){
    return (
        <section>
            <h1> POLITIQUE DE CONFIDENTIALTÉ</h1>
            <p>Bienvennue sur notre site BlaBlaBook, Veuillez lire attentivement nos conditions générales d'utilisation avant d'utiliser notre site</p>
            <ol>
                {sections.map((item, index) =>(
                    <li key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>

                    </li>
                ))}
            </ol>
        </section>
    );
}
    