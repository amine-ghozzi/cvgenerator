import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Bienvenue sur CV Generator</h1>
      <p>Créez et adaptez votre CV en quelques clics</p>
      <div className="actions">
        <Link to="/cv" className="button">Créer un nouveau CV</Link>
        <Link to="/job" className="button">Analyser une offre d'emploi</Link>
      </div>
    </div>
  );
}

export default Home; 