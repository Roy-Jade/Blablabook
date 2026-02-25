// Ce fichier permet d'enregistrer toute valeur dynamique (un contexte) qui doit pouvoir être partagé avec l'intégralité de l'application à tout moment.

import { createContext } from "react";

// Contexte pour les informations de l'utilisateur actuellement connecté.
export const CurrentUserContext = createContext(null);