export default function MentionsLegale({ sections }){
    return (
        <section>
            <h1>Mentions Légales</h1>
            <p>Bienvenue sur notre site BlaBlaBook, Veuillez lire attentivement nos conditions générales d'utilisation avant d'utiliser notre site</p>
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
    