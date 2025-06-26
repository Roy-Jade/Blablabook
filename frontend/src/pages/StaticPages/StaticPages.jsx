import MentionsLegale from "../../components/StaticPages/MentionsLegales";
import CGU from "../../components/StaticPages/CGU";
import Accessibite from "../../components/StaticPages/Accessibilite";
import PolitiqueConfidentialite from "../../components/StaticPages/PolitiqueConfidentialite";
import About from "../../components/StaticPages/About";
import { useLocation } from "react-router";
import data from '../../../static/data/data.json'

export default function StaticPages(){
    const location = useLocation();
    if (location.pathname === "/legal") {
        return <MentionsLegale sections={data.mentionsLegalesSections}/>;
      } else if (location.pathname === "/terms") {
        return  <PolitiqueConfidentialite sections={data.cguTerms}/>;
      } else if (location.pathname === "/accessibility") {
        return  <Accessibite sections={data.accessibiteSections}/>;
      } else if (location.pathname === "/privacy") {
        return <CGU sections={data.cguTerms}/>;
      } else if (location.pathname === "/about") {
        return <About />;
      } else {
        return <h1>Page non trouvée</h1>;
      }
    }




