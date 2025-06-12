import MentionsLegale from "../../components/PagesStatiques/MentionsLegale";
import CGU from "../../components/PagesStatiques/CGU";

export default function InformationsLegales(){
    const mentionsLegalesSections = [
        {
            title: 'ÉDITION DU SITE',
            content: 'BlaBlaBook'
        },
        {
            title: 'HÉBERGEMENT',
            content: '.'
        },
        {
            title: 'ACCÈS AU SITE',
            content: 'Le site est accessible 24/24h sauf en cas de maintenance ou de force majeure.'
        },
        {
            title: 'PROPRIÉTÉ INTELLECTUELLE',
            content: 'Tous les contenus présents sur le site sont protégés par le droit de la propriété intellectuelle.'
        },
        {
            title: 'RESPONSABILITÉ',
            content: 'L’éditeur ne peut être tenu responsable des erreurs ou interruptions du service.'
        },
        {
            title: 'LIENS HYPERTEXTES',
            content: 'Le site peut contenir des liens vers d’autres sites, non contrôlés par BlaBlaBook.'
        },
        {
            title: 'DROIT APPLICABLE ET JURIDICTION COMPÉTENTE',
            content: 'Le présent site est soumis au droit français. En cas de litige, les tribunaux de France sont compétents.'
        }
    ];
    
    const cguTerms = [
        {
            title: 'INFORMATIONS LÉGALES',
            content: 'Quodis habentur magnalia inter potentiam et divitias, et non illam quidem haec eo spectant haec quoque vos omnino dissimil illud quo solo.'
        },
        {
            title: 'ACCÈS AU SITE',
            content: 'Quodis habentur magnalia inter potentiam et divitias, et non illam quidem haec eo spectant haec quoque vos omnino dissimil illud quo solo.'
        },
        {
            title: 'COLLECTE DES DONNÉES',
            content: 'Quodis habentur magnalia inter potentiam et divitias, et non illam quidem haec eo spectant haec quoque vos omnino dissimil illud quo solo.'
        },
        {
            title: 'PROPRIÉTÉ INTELLECTUELLE',
            content: 'Quodis habentur magnalia inter potentiam et divitias, et non illam quidem haec eo spectant haec quoque vos omnino dissimil illud quo solo.'
        },
        {
            title: 'RESPONSABILITÉ',
            content: 'Quodis habentur magnalia inter potentiam et divitias, et non illam quidem haec eo spectant haec quoque vos omnino dissimil illud quo solo.'
        },
        {
            title: 'LIENS HYPERTEXTES',
            content: 'Quodis habentur magnalia inter potentiam et divitias, et non illam quidem haec eo spectant haec quoque vos omnino dissimil illud quo solo.'
        },
        {
            title: 'DROIT APPLICABLE ET JURIDICTION COMPÉTENTE',
            content: 'Quodis habentur magnalia inter potentiam et divitias, et non illam quidem haec eo spectant haec quoque vos omnino dissimil illud quo solo.'
        }
    ];
    
    
    return (
        <div>
             <h1>Informations légales</h1>
             
             <MentionsLegale sections={mentionsLegalesSections}/>
             <CGU sections={cguTerms}/>
        </div>
    )


}