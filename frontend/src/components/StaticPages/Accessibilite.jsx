import {Link} from 'react-router';

export default function Accessibite({ sections }){
    return (
        <section>
            <h1> Accessibité</h1>
            <p>Bienvenue sur notre site BlaBlaBook, Veuillez lire attentivement nos <Link className='text_link' to='/privacy'>conditions générales d'utilisation</Link> avant d'utiliser le site.</p>
            <ol>
                {sections.map((item, index) =>(
                    <div key={index}>
                        <h2>{item.title}</h2>
                        <p>{item.content}</p>
                        {item.footer && (
                            <p>
                            {item.footer} <Link className='text_link' to="/contact">Contact</Link>.
                            </p>
                        )}
                    </div>
                ))}
            </ol>
        </section>
    );
}