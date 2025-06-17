export default function Accessibite({ sections }){
    return (
        <section>
            <h1> Accessibite</h1>
            <p>Bienvennue sur notre site BlaBlaBook, Veuillez lire attentivement nos conditions générales d'utilisation avant d'utiliser</p>
            <ol>
                {sections.map((item, index) =>(
                    <div key={index}>
                        <p><strong>{item.title}</strong></p>
                        <p>{item.content}</p>
                        {item.footer && (
                            <p>
                            {item.footer} <a href="/contact">Contact</a>.
                            </p>
                        )}
                    </div>
                ))}
            </ol>
        </section>
    );
}