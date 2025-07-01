import { useEffect, useState } from "react";
import api from "../../../api";

export default function Login() {

  if(typeof token !== 'undefined') {
    console.log("Token JWT : "+token)
  } else {console.log("Pas de token")}

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
    
  const login = async () => {
    console.log("Fonction login initialisée")
    try {
      console.log("Test de réponse...")
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      console.log("Réponse envoyée : "+response)
    } catch (error) {
      console.error(error.response.data);
    }
  };

  // useEffect(() => {
    // const login = async () => {
    //   try {
    //     const response = await api.post('/login', { email, password });
    //     localStorage.setItem('token', response.data.token);
    //     setUser(response.data.user);
    //   } catch (error) {
    //     console.error(error.response.data);
    //   }
    // };

  //   login();
  // },[email, password]);

  const handleSubmit = (e) => {
    console.log("Formulaire envoyé")
    e.preventDefault()
    login()
    console.log(`Mail : ${email} et MDP : ${password}`)
  }
  
  return (
    <div>
      <h1>Connexion</h1>
      <form method="post" onSubmit={(e) => handleSubmit(e)}>

        <fieldset>
          <label htmlFor="email">Adresse e-mail</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple: Marizia99@gmail.com" required/>
        </fieldset>

        <fieldset>
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="nouha@2021" required/>
        </fieldset>

        <fieldset>
          <a
          href="#"
          onClick={(e) =>{
              e.preventDefault();
              window.alert("Lien de réinitialisation du mot de passe envoyé à votre adresse e-mail.");
          }}
          >
          Mot de passe oublié ?
          </a>
        </fieldset>

        <fieldset>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" />
            Se souvenir de moi
          </label>
        </fieldset>

        <button type="submit">Se connecter</button>

      </form>
    </div>
  );
}