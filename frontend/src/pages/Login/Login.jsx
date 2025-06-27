import { useEffect, useState } from "react";
import api from "../../../api";

export default function Login({email, password}) {

  if(typeof token !== 'undefined') {
    console.log("Token JWT : "+token)
  } else {console.log("Pas de token")}

  // function login() {
  //   const login = async () => {
  //     try {
  //       const response = await api.post('/login', { email, password });
  //       localStorage.setItem('token', response.data.token);
  //       setUser(response.data.user);
  //     } catch (error) {
  //       console.error(error.response.data);
  //     }
  //   };
  // }
  useEffect(() => {
    const login = async () => {
      try {
        const response = await api.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    login();
  },[email, password]);

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // ici on appelle la fonction login du store avec les valeurs du form
  //   login(username, password)
  //   // notez ici la redirection vers la page d'accueil
  //   return navigate('/')
  // }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div>
      <h1>Connexion</h1>
      <form method="post" 
      // onSubmit={(e) => login(e)}
      >

        <div>
          <label htmlFor="email">Adresse e-mail</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="exemple: Marizia99@gmail.com" required/>
        </div>

        <div>
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="nouha@2021" required/>
        </div>

        <div>
          <a
          href="#"
          onClick={(e) =>{
              e.preventDefault();
              window.alert("Lien de réinitialisation du mot de passe envoyé à votre adresse e-mail.");
          }}
          >
          Mot de passe oublié ?
          </a>
        </div>

        <div>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" />
            Se souvenir de moi
          </label>
        </div>

        <button type="submit">Se connecter</button>

      </form>
    </div>
  );
}