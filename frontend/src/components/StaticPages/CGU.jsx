export default function CGU({ sections }){
    return (
        <section>
            <h1>Conditions générales d'utilisation</h1>
            <p>Bienvennue sur notre site BlaBlaBook, Veuillez lire attentivement nos conditions générales d'utilisation avant d'utiliser</p>
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