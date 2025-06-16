// On importe notre [Composant].scss
import './Questions.scss';

// On créée une fonction qui contient un return 
// Le return doit comprendre une balise englobant tout le reste. Utiliser une balise vide <> fonctionne.
// On, doit enfin exporter la fonction en default sous le nom de notre composant

// L'écriture ci-dessus permet de faire la fonction et de l'exporter en même temps
export default function Questions() {
    const faqData = [
        {
          questionNumber: "Question 1",
          title: "Est-ce que je dois créer un compte pour utiliser BlaBlaBook ?",
          answerNumber: "Réponse 1",
          content:
            "Non, la navigation de base (recherche, exploration des livres, consultation des détails) est accessible sans compte. Mais un compte est nécessaire pour gérer votre bibliothèque personnelle ou interagir avec la communauté.",
        },
        {
          questionNumber: "Question 2",
          title: "Comment créer un compte ?",
          answerNumber: "Réponse 2",
          content:
            "Cliquez sur “Connexion” en haut à droite, puis remplissez le formulaire avec un email valide, un pseudonyme, et un mot de passe.",
        },
        {
          questionNumber: "Question 3",
          title: "J’ai oublié mon mot de passe, que faire ?",
          answerNumber: "Réponse 3",
          content:
            "Une option “Mot de passe oublié” est disponible sur la page de connexion. Suivez les instructions pour le réinitialiser.",
        },
        {
          questionNumber: "Question 4",
          title: "Puis-je supprimer mon compte ?",
          answerNumber: "Réponse 4",
          content:
            "Oui, vous pouvez supprimer votre compte dans les paramètres de votre profil.",
        },
        {
          questionNumber: "Question 5",
          title: "Comment ajouter un livre à ma bibliothèque ?",
          answerNumber: "Réponse 5",
          content:
            "Une fois connecté, recherchez un livre et cliquez sur “Ajouter à ma bibliothèque”. Vous pourrez le marquer comme “lu” ou “à lire”.",
        },
        {
          questionNumber: "Question 6",
          title: "Puis-je modifier le statut d’un livre ?",
          answerNumber: "Réponse 6",
          content:
            "Oui, dans votre bibliothèque personnelle, vous pouvez changer le statut “lu” ↔ “à lire” à tout moment.",
        },
        {
          questionNumber: "Question 7",
          title: "Puis-je supprimer un livre de ma bibliothèque ?",
          answerNumber: "Réponse 7",
          content:
            "Oui, il suffit de cliquer sur “Supprimer” à côté du livre dans votre bibliothèque.",
        },
        {
          questionNumber: "Question 8",
          title: "Est-ce que je peux noter un livre ?",
          answerNumber: "Réponse 8",
          content:
            "Cette fonctionnalité sera disponible dans une prochaine mise à jour. Vous pourrez attribuer une note et laisser un commentaire.",
        },
        {
          questionNumber: "Question 9",
          title: "Puis-je partager ma bibliothèque avec d'autres utilisateurs ?",
          answerNumber: "Réponse 9",
          content:
            "Oui, vous pouvez choisir de rendre votre bibliothèque publique ou privée dans les paramètres de votre profil.",
        },
        {
          questionNumber: "Question 10",
          title: "Est-ce que je peux discuter avec d’autres membres ?",
          answerNumber: "Réponse 10",
          content:
            "Un chat et un forum seront disponibles dans les évolutions futures du site.",
        },
        {
          questionNumber: "Question 11",
          title: "D’où viennent les livres affichés sur BlaBlaBook ?",
          answerNumber: "Réponse 11",
          content:
            "Les données proviennent de l’API publique OpenLibrary, une base de données collaborative de livres.",
        },
        {
          questionNumber: "Question 12",
          title: "Comment fonctionne la recherche ?",
          answerNumber: "Réponse 12",
          content:
            "Tapez un mot-clé (titre, auteur…) dans la barre de recherche. Vous pouvez aussi utiliser des filtres pour affiner les résultats.",
        },
        {
          questionNumber: "Question 13",
          title: "Mes données sont-elles partagées ?",
          answerNumber: "Réponse 13",
          content:
            "Non. Vos données personnelles (email, mot de passe…) sont sécurisées et ne sont jamais partagées.",
        },
        {
          questionNumber: "Question 14",
          title: "BlaBlaBook est-il conforme au RGPD ?",
          answerNumber: "Réponse 14",
          content:
            "Oui. Vous pouvez à tout moment accéder, modifier ou supprimer vos données via votre compte.",
        },
        {
          questionNumber: "Question 15",
          title: "Comment contacter l’équipe BlaBlaBook ?",
          answerNumber: "Réponse 15",
          content:
            "Vous pouvez utiliser le formulaire de contact accessible depuis le menu “Contact” en bas de page.",
        },
      ];
      
    return(  
      <> 
        <h1>Foire Aux Questions</h1>
          {faqData.map((item, index) =>(
              <div key={index}>
                  <div>
                      <strong>{item.questionNumber}</strong>
                      <p>{item.title}</p>
                  </div>
                  <div>
                      <strong>{item.answerNumber}</strong>
                      <p>{item.content}</p>
                  </div>
              </div>
            ))
          }
      </> 
    );
}