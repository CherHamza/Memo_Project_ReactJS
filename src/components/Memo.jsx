// Memo.js
import React, { useEffect, useState } from 'react';
import JsonServerTerms from '../services/JsonServerTerms';



function Memo() {
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const loadedTerms = await JsonServerTerms.loadTerms();
        setTerms(loadedTerms);
      } catch (error) {
        console.error("Erreur lors du chargement des termes :", error);
      }
    };

    fetchTerms();
  }, []);

  const handleTermClick = (term) => {
    // Vous pouvez gérer ce qui se passe lorsque vous cliquez sur un terme ici
    alert(`Vous avez cliqué sur le terme : ${term.name}`);
  };

  return (
    <div>
      <h1>MEMO</h1>
      <div className="d-flex justify-content-around">
        {terms.map((term) => (
          <span
            key={term.id}
            className="term border rounded-pill px-3 py-2 bg-success text-white"
            onClick={() => handleTermClick(term)}
          >
            {term.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Memo;
