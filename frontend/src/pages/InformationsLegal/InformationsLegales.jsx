import MentionsLegale from "../../components/PagesStatiques/MentionsLegale";
import CGU from "../../components/PagesStatiques/CGU";
import Accessibite from "../../components/PagesStatiques/Accessibite";
import PolitiqueConfidentialite from "../../components/PagesStatiques/PolitiqueConfidentialite";

export default function InformationsLegales(){
    const mentionsLegalesSections = [
        {
            title: 'ÉDITION DU SITE',
            content: 'BlaBlaBook'
        },
        {
            title: 'HÉBERGEMENT',
            content: '...'
        },
        {
            title: 'ACCÈS AU SITE',
            content: 'Le site est accessible 24/24h sauf en cas de maintenance ou de force majeure.'
        },
        {
            title: 'PROPRIÉTÉ INTELLECTUELLE',
            content: 'Tous les contenus présents sur le site BlaBlaBook (textes, images, graphismes, logo, etc.) sont protégés par les lois en vigueur sur la propriété intellectuelle. Toute reproduction non autorisée est interdite.'
        },
        {
            title: 'RESPONSABILITÉ',
            content: 'L’éditeur ne peut être tenu responsable d’éventuelles erreurs, de problèmes techniques ou d’interruptions de service indépendants de sa volonté'
        },
        {
            title: 'LIENS HYPERTEXTES',
            content: 'Le site peut contenir des liens vers d’autres sites web. BlaBlaBook n’exerce aucun contrôle sur ces sites et ne peut être tenu responsable de leur contenu.'
        },
        {
            title: 'DROIT APPLICABLE ET JURIDICTION COMPÉTENTE',
            content: 'Le présent site est soumis au droit français. En cas de litige, les tribunaux de France sont compétents.'
        }
    ];
    
    const cguTerms = [
        {
            title: 'INFORMATIONS LÉGALES',
            content: 'Le site BlaBlaBook est édité par une équipe au sein de promo Béhemoth chez O\'clock. Pour toute question, veuillez nous contacter via le formulaire de contact.'
        },
        {
            title: 'ACCÈS AU SITE',
            content: 'Le site est accessible 24h/24 et 7j/7, sauf en cas de maintenance technique ou de force majeure. L’accès peut être interrompu temporairement pour des raisons de maintenance sans préavis.'
        },
        {
            title: 'COLLECTE DES DONNÉES',
            content: 'BlaBlaBook collecte uniquement les données nécessaires au bon fonctionnement du service (inscription, gestion de bibliothèque, avis, etc.). Les données sont traitées de manière sécurisée.'
        },
        {
            title: 'PROPRIÉTÉ INTELLECTUELLE',
            content: 'Tous les contenus du site BlaBlaBook (textes, images, logo, code source, etc.) sont protégés par le droit de la propriété intellectuelle. Toute reproduction sans autorisation est strictement interdite.'
        },
        {
            title: 'RESPONSABILITÉ',
            content: 'BlaBlaBook ne peut être tenu responsable des erreurs ou indisponibilités temporaires du site. L’utilisation du site se fait sous la responsabilité de l’utilisateur.'
        },
        {
            title: 'LIENS HYPERTEXTES',
            content: 'Le site peut contenir des liens vers des sites tiers. BlaBlaBook n’exerce aucun contrôle sur leur contenu et décline toute responsabilité quant à leur accessibilité ou leur sécurité.'
        },
        {
            title: 'DROIT APPLICABLE ET JURIDICTION COMPÉTENTE',
            content: 'Les présentes conditions d’utilisation sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.'
        }
    ];
    
    const accessibiteSections = [
        {
            title: 'Cette page n\'est pas une page d\'aide. Elle vise à présenter l\'accessibilité du site BlaBlaBook et à définir le niveau d\'accessibilité général constaté, conformément au référentiel RGAA et à la réglementation en vigueur.'
        }
    ];
    
    
    
    
    return (
        <div>
             <h1>Informations légales</h1>
             
             <MentionsLegale sections={mentionsLegalesSections}/>
             <CGU sections={cguTerms}/>
             <Accessibite sections={accessibiteSections}/>
             <PolitiqueConfidentialite sections={mentionsLegalesSections}/>
        </div>
    )


}