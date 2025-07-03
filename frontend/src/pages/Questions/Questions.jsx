// On importe notre [Composant].scss
import './Questions.scss';
import { Helmet } from 'react-helmet';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function Questions() {
    const faqData = [
        {
          question: "Est-ce que je dois créer un compte pour utiliser BlaBlaBook ?",
          answer: "Non, la navigation de base (recherche, exploration des livres, consultation des détails) est accessible sans compte. Mais un compte est nécessaire pour gérer votre bibliothèque personnelle ou interagir avec la communauté.",
        },
        {
          question: "Comment créer un compte ?",
          answer: "Cliquez sur “Connexion” en haut à droite, puis remplissez le formulaire avec un email valide, un pseudonyme, et un mot de passe.",
        },
        {
          question: "J’ai oublié mon mot de passe, que faire ?",
          answer: "Une option “Mot de passe oublié” est disponible sur la page de connexion. Suivez les instructions pour le réinitialiser.",
        },
        {
          question: "Puis-je supprimer mon compte ?",
          answer: "Oui, vous pouvez supprimer votre compte dans les paramètres de votre profil.",
        },
        {
          question: "Comment ajouter un livre à ma bibliothèque ?",
          answer: "Une fois connecté, recherchez un livre et cliquez sur “Ajouter à ma bibliothèque”. Vous pourrez le marquer comme “lu” ou “à lire”.",
        },
        {
          question: "Puis-je modifier le statut d’un livre ?",
          answer: "Oui, dans votre bibliothèque personnelle, vous pouvez changer le statut “lu” ↔ “à lire” à tout moment.",
        },
        {
          question: "Puis-je supprimer un livre de ma bibliothèque ?",
          answer: "Oui, il suffit de cliquer sur “Supprimer” à côté du livre dans votre bibliothèque.",
        },
        {
          question: "Est-ce que je peux noter un livre ?",
          answer: "Cette fonctionnalité sera disponible dans une prochaine mise à jour. Vous pourrez attribuer une note et laisser un commentaire.",
        },
        {
          question: "Puis-je partager ma bibliothèque avec d'autres utilisateurs ?",
          answer: "Oui, vous pouvez choisir de rendre votre bibliothèque publique ou privée dans les paramètres de votre profil.",
        },
        {
          question: "Est-ce que je peux discuter avec d’autres membres ?",
          answer: "Un chat et un forum seront disponibles dans les évolutions futures du site.",
        },
        {
          question: "D’où viennent les livres affichés sur BlaBlaBook ?",
          answer: "Les données proviennent de l’API publique OpenLibrary, une base de données collaborative de livres.",
        },
        {
          question: "Comment fonctionne la recherche ?",
          answer: "Tapez un mot-clé (titre, auteur…) dans la barre de recherche. Vous pouvez aussi utiliser des filtres pour affiner les résultats.",
        },
        {
          question: "Mes données sont-elles partagées ?",
          answer: "Non. Vos données personnelles (email, mot de passe…) sont sécurisées et ne sont jamais partagées.",
        },
        {
          question: "BlaBlaBook est-il conforme au RGPD ?",
          answer: "Oui. Vous pouvez à tout moment accéder, modifier ou supprimer vos données via votre compte.",
        },
        {
          question: "Comment contacter l’équipe BlaBlaBook ?",
          answer: "Vous pouvez utiliser le formulaire de contact accessible depuis le menu “Contact” en bas de page.",
        },
      ];
      
    return(  
      <>
        <Helmet>
          <title>FAQ - BlablaBook</title>
          <meta name='description' content="Trouvez les réponses aux questions les plus fréquentes sur l'utilisation de BlablaBook."></meta>
        </Helmet> 
        <h1>Foire Aux Questions</h1>
          {faqData.map((item, index) =>(
              <article className='question' key={index}>
                  <p>{item.question}</p>
                  <p>{item.answer}</p>
              </article>
            ))
          }
      </> 
    );
}