export default function MentionsLegale({ sections }){
    return (
        <section>
            <h2>Mentions Légales</h2>
            <p>Bienvennue sur notre site BlaBlaBook, Veuillez lire attentivement nos conditions générales d'utilisation avant d'utiliser notre site</p>
            <ol>
                {sections.map((item, index) =>(
                    <li key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>

                    </li>
                ))}
            </ol>
        </section>
    );
}
    