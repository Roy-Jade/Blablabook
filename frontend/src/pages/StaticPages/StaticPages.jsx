import MentionsLegale from "../../components/StaticPages/MentionsLegales";
import CGU from "../../components/StaticPages/CGU";
import Accessibite from "../../components/StaticPages/Accessibilite";
import PolitiqueConfidentialite from "../../components/StaticPages/PolitiqueConfidentialite";
import About from "../../components/StaticPages/About";
import { useLocation } from "react-router";
import data from '../../../static/data/data.json';
import { Helmet } from 'react-helmet';

export default function StaticPages(){
    const location = useLocation();
    if (location.pathname === "/legal") {
        return (
        <>
        <Helmet>
          <title>Mentions légales - BlablaBook</title>
          <meta name="description" content="Consultez les mentions légales du site BlablaBook." />
        </Helmet>
        <MentionsLegale sections={data.mentionsLegalesSections}/>
        </>
        );
      } else if (location.pathname === "/terms") {
        return (  
          <>
          <Helmet>
            <title>Politique de confidentialité - BlablaBook</title>
            <meta name="description" content="Conditions générales d'utilisation de BlablaBook." />
          </Helmet>
          <PolitiqueConfidentialite sections={data.cguTerms}/>
          </>
        );
      } else if (location.pathname === "/accessibility") {
        return (
          <>
            <Helmet>
              <title>Accessibilité - BlablaBook</title>
              <meta name="description" content="Déclaration d’accessibilité de BlablaBook, conforme aux normes RGAA." />
            </Helmet>
            <Accessibite sections={data.accessibiteSections}/>
          </>
        );
      } else if (location.pathname === "/privacy") {
        return ( 
          <>
            <Helmet>
              <title>Conditions Générales d'Utilisation - BlablaBook</title>
              <meta name="description" content="En savoir plus sur la protection de vos données personnelles avec BlablaBook." />
            </Helmet>
            <CGU sections={data.cguTerms} />
          </>
        );
       
      } else if (location.pathname === "/about") {
        return (
          <>
            <Helmet>
              <title>À propos - BlablaBook</title>
              <meta name="description" content="Découvrez qui nous sommes et notre mission chez BlablaBook." />
            </Helmet>
            <About />
          </>
        );
      } else {
        return <h1>Page non trouvée</h1>;
      }
    }




