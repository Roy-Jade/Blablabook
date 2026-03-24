// Fichier de configuration du cache
import NodeCache from "node-cache";

// On exporte le constructeur de cache avec une durée de une heure (3600 secondes)
const cache = new NodeCache({ stdTTL: 3600 });


export default cache;