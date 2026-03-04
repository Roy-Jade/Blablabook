import './ChangeInfos.scss'
import { useState } from "react";

export default function ChangeInfos({infoType, info, onSubmit, message, isLoading, isConfirmationRequired=false}) {
  const [showChangeInfos, setShowChangeInfos] = useState(false);
  const [password, setPassword] = useState("");
  const [newInfo, setNewInfo] = useState("");
  const [newInfoBis, setNewInfoBis] = useState("");

  const toggleShowChangeInfos = () => {
    setShowChangeInfos(!showChangeInfos);
  };

  const handleSubmit= async () => {
    if (isConfirmationRequired && newInfo !== newInfoBis) {
      return;
    }

    await onSubmit(newInfo, password);
    setNewInfo("");
    setNewInfoBis("");
    setPassword("");
  };

return (
  <section className='dashboard-info'>
  {message && <p>{message}</p>}

  <p className='dashboard-info_title'>Votre {infoType}</p>
  <p className='dashboard-info_data'>{info}</p>
  <button className="dashboard-info_button button " onClick={toggleShowChangeInfos}>Changer votre {infoType}</button>

  {showChangeInfos && 
    <form>
      <fieldset>
        <label htmlFor={infoType}>
          Entrez votre nouveau {infoType}
        </label>
        <input 
          required
          name="newInfo" 
          placeholder={`${infoType}`} 
          onChange={(e) => setNewInfo(e.target.value)} 
        />
      </fieldset>

      {isConfirmationRequired && <fieldset>
        <label htmlFor={infoType}>
          Confirmez le nouveau {infoType}
        </label>
        <input 
          required
          name="newInfoBis" 
          placeholder={`Confirmation ${infoType}`} 
          onChange={(e) => setNewInfoBis(e.target.value)} 
        />
      </fieldset>
      }
      
      <fieldset>
        <label htmlFor='password'>Entrez votre mot de passe pour valider le changement</label>
        <input required name="password" onChange={(e) => setPassword(e.target.value)}></input>
      </fieldset>

      <button disabled={isLoading} className="button button_medium" type="submit" onClick={handleSubmit}>{isLoading ? "Chargement..." : "Valider le changement"}</button>
    </form>
  }
  </section>
)
};