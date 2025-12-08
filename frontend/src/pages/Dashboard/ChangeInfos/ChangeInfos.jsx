import './ChangeInfos.scss'
import { useState } from "react";
import api from "../../../../api";

export default function ChangeInfos({infoType, info}) {
  const [showChangeInfos, setShowChangeInfos] = useState(false);
  const [oldInfo, setOldInfo] = useState(null);
  const [newInfo, setNewInfo] = useState(null);
  const [newInfoBis, setNewInfoBis] = useState(null);
  const [message, setMessage] = useState("");

  

  const handleChangeInfos = async() => {
    if (newInfo !== newInfoBis || !newInfo) {
      setMessage('Les emails ne correspondent pas.');
      return;
    }
    try {
      const response = await api.patch('/user', { infoType, newInfo });
      setMessage(`${infoType} changé avec succès !`);
    } catch(error) {
      setMessage(error.response.data.message);
    }
    setNewInfo(null);
    setNewInfoBis(null);
  }

  const toggleShowChangeInfos = () => {
    setShowChangeInfos(!showChangeInfos);
  };

return (
  <section className='dashboard-info'>
  {message && <p>{message}</p>}

  <section className='dashboard-info_section'>
    <p className='dashboard-info_title'>Votre {infoType}</p>
    <p className='dashboard-info_data'>{info}</p>
    <button className="dashboard-info_button button " onClick={toggleShowChangeInfos}>Changer</button>
  </section>

  {showChangeInfos && 
    <div>
      <input 
        required
        name="newInfo" 
        placeholder={`${infoType}`} 
        onChange={(e) => setNewInfo(e.target.value)} 
      />
      <input 
        required
        name="newInfoBis" 
        placeholder={`Confirmation ${infoType}`} 
        onChange={(e) => setNewInfoBis(e.target.value)} 
      />
      <button className="button button_medium" type="submit" onClick={handleChangeInfos}>Valider le changement</button>
    </div>
  }
  
  
  </section>
)
};