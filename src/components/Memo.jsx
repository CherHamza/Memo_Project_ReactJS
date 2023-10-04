import React, { useEffect, useState } from "react";
import JsonServerTerms from "../services/JsonServerTerms";
import JsonServerColumns from "../services/JsonServerColumns";
import JsonServerCards from "../services/JsonServerCards";

function Memo() {
  const [terms, setTerms] = useState([]);
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    question: "",
    answer: "",
    column: "",
    term: ""
  });
  const [selectedTerm, setSelectedTerm] = useState(""); // afin de mettre a jour  l'etat pour le terme selectionné

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const loadedTerms = await JsonServerTerms.loadTerms();
        setTerms(loadedTerms);
      } catch (error) {
        console.error("Erreur lors du chargement des termes :", error);
      }
    };

    const fetchColumns = async () => {
      try {
        const loadedColumns = await JsonServerColumns.loadColumns();
        setColumns(loadedColumns);
      } catch (error) {
        console.error("Erreur lors du chargement des colonnes :", error);
      }
    };

    const fetchCards = async () => {
      try {
        const loadedCards = await JsonServerCards.loadCards();
        setCards(loadedCards);
      } catch (error) {
        console.error("Erreur lors du chargement des cartes :", error);
      }
    };

    fetchTerms();
    fetchColumns();
    fetchCards();
  }, []);

  const handleTermClick = (term) => {
    setSelectedTerm(term.id); // afin de mettre a jour le terme selectionné
  };

  const getCardsByColumnIdAndTerm = (columnId, termId) => {
    return cards.filter(
      (card) => card.column === columnId && (termId === "" || card.tid === termId)
    );
  };

  const handleAddCard = async () => {
    try {
      const addedCard = await JsonServerCards.addCard({
        ...newCard,
        term: selectedTerm // Utilise le terme sélectionné
      });
      setCards([...cards, addedCard]);
      setNewCard({
        question: "",
        answer: "",
        column: "",
        term: ""
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la carte :", error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    try {
      await JsonServerCards.deleteCard(cardId);
      setCards(cards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte :", error);
    }
  };

  return (
    <div>
      <h1>MEMO</h1>
      <div className="d-flex justify-content-around">
        {terms.length > 0 &&
          terms.map((term) => (
            <span
              key={term.id}
              className={`term border rounded-pill px-3 py-2 ${
                selectedTerm === term.id ? "bg-primary text-white" : "bg-success text-white"
              }`}
              onClick={() => handleTermClick(term)}
            >
              {term.name}
            </span>
          ))}
      </div>
      <div>
  <h3>Ajouter une carte</h3>
  <form>
    <div className="mb-3">
      <label htmlFor="question" className="form-label">
        Question
      </label>
      <input
        type="text"
        className="form-control"
        id="question"
        value={newCard.question}
        onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="answer" className="form-label">
        Réponse
      </label>
      <input
        type="text"
        className="form-control"
        id="answer"
        value={newCard.answer}
        onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="column" className="form-label">
        Colonne
      </label>
      <select
        className="form-select"
        id="column"
        value={newCard.column}
        onChange={(e) => setNewCard({ ...newCard, column: parseInt(e.target.value) })}
        required
      >
        <option value="">Sélectionnez une colonne</option>
        {columns.map((col) => (
          <option key={col.id} value={col.id}>
            {col.label}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="term" className="form-label">
        Terme
      </label>
      <select
        className="form-select"
        id="term"
        value={newCard.tid} // 
        onChange={(e) => setNewCard({ ...newCard, tid: parseInt(e.target.value) })}
        required
      >
        <option value="">Sélectionnez un terme</option>
        {terms.map((term) => (
          <option key={term.id} value={term.id}>
            {term.name}
          </option>
        ))}
      </select>
    </div>
    <button type="button" className="btn btn-primary" onClick={handleAddCard}>
      Ajouter
    </button>
  </form>
</div>



      <div>
        <h2>Colonnes</h2>
        <div className="d-flex justify-content-around">
          {columns.length > 0 &&
            columns.map((column) => (
              <div
                key={column.id}
                className="column border rounded p-3 bg-success text-white"
              >
                <h2>{column.label}</h2>
                <div className="d-flex flex-column">
                  {getCardsByColumnIdAndTerm(column.id, selectedTerm).map((card) => (
                    <div
                      key={card.id}
                      className="card border rounded p-3 bg-info text-white my-2"
                    >
                      <h3>Question: {card.question}</h3>
                      <p>Réponse: {card.answer}</p>
                      <button onClick={() => handleDeleteCard(card.id)}>Supprimer</button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Memo;
