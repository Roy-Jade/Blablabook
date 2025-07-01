import { useState } from "react";
import './Options.scss';

export default function Options() {
  const [autoShare, setAutoShare] = useState("no");
  const [shareAudience, setShareAudience] = useState("members");

  return (
    <div>
    <h1>Options de partage</h1>
      <p><strong>Partage automatique des livres</strong></p>
      <div className="autoshare">
        <label>
          <input
            type="radio"
            name="autoShare"
            value="no"
            checked={autoShare === "no"}
            onChange={() => setAutoShare("no")}
          />
          Ne pas partager (défaut)
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="autoShare"
            value="yes"
            checked={autoShare === "yes"}
            onChange={() => setAutoShare("yes")}
          />
          Partager automatiquement les livres
        </label>
      </div>

      <br />

      <p><strong>Public cible du partage</strong></p>
      <div className="shareAudience">
        <label>
          <input
            type="radio"
            name="shareAudience"
            value="members"
            checked={shareAudience === "members"}
            onChange={() => setShareAudience("members")}
          />
          Membres inscrits (défaut)
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="shareAudience"
            value="visitors"
            checked={shareAudience === "visitors"}
            onChange={() => setShareAudience("visitors")}
          />
          Tous les visiteurs du site
        </label>
      </div>
    </div>
  );
}
