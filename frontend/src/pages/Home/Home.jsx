// Dans le fichier pages, on créée un dossier du nom de notre composant
// On créée un fichier [Composant].jsx et un [Composant].scss

// On importe notre [Composant].scss
import './Home.scss';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function Home() {
    return(
        <>
            {/* Commencer à modifier ici */}
            <h1>Votre prochaine lecture vous attend</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora magnam eveniet ea! Harum dolores aspernatur sit adipisci officiis, tempore cupiditate debitis consequatur, est quae neque, quod error veniam et consequuntur.
            Saepe quo quod non vitae laborum laboriosam incidunt quia temporibus veritatis quidem. Autem error nesciunt dolorum laudantium enim recusandae voluptas fugit a, magnam temporibus ea voluptatibus, delectus, repellendus libero quis.
            Tempore rerum, non commodi laudantium ex molestias vitae laboriosam nihil libero iste quibusdam. Omnis eaque quos ducimus cum ipsum voluptatum fuga culpa at, animi iure commodi et labore autem mollitia?
            Quaerat esse asperiores quas, vitae sint quia incidunt quibusdam distinctio earum quo laboriosam nam excepturi exercitationem. Veniam voluptas nam assumenda repellendus odio dolore delectus, voluptatum sunt alias voluptates quod suscipit.
            At odio beatae vitae natus tempore pariatur fugiat ducimus corporis exercitationem doloremque, dolor sit harum nostrum cupiditate quis dignissimos aut obcaecati modi suscipit iure nam nemo. Odit non ut et!
            </p>
            {/* Finir de modifier ici */}
        </>
    )
}