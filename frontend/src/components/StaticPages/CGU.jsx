export default function CGU({ sections }){
    return (
        <section>
            <h2>Conditions générales d'utilisation</h2>
            <p>Bienvennue sur notre site BlaBlaBook, Veuillez lire attentivement nos conditions générales d'utilisation avant d'utiliser</p>
            <ol>
                {sections.map((item, index) =>(
                    <div key={index}>
                        <p>{item.title}</p>
                        <p>{item.content}</p>
                    </div>
                ))}
            </ol>
        </section>
    );
}