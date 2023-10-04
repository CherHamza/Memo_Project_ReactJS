import React, { useEffect, useState } from "react";
import JsonServerTerms from "../services/JsonServerTerms";
import JsonServerColumns from "../services/JsonServerColumns";
import JsonServerCards from "../services/JsonServerCards";

function Memo() {
  // Définition des états du composant
  const [terms, setTerms] = useState([]); // Liste des termes
  const [columns, setColumns] = useState([]); //  colonnes
  const [cards, setCards] = useState([]); // cartes
  const [newCard, setNewCard] = useState({
    question: "",
    answer: "",
    column: "",
    term: ""
  }); // État du formulaire pour ajouter une carte
  const [selectedTerm, setSelectedTerm] = useState(""); // Terme selectionné
  const [newTerm, setNewTerm] = useState(""); // new terme à ajouter

  // UseEffect pour charger les donnés du composant
  useEffect(() => {
    // Fonction async pour charger les termes depuis JsonServ
    const fetchTerms = async () => {
      try {
        const loadedTerms = await JsonServerTerms.loadTerms();
        setTerms(loadedTerms);
      } catch (error) {
        console.error("Erreur lors du chargement des termes :", error);
      }
    };

    // Fonction async pour charger les colonnes depuis le Jsonserv
    const fetchColumns = async () => {
      try {
        const loadedColumns = await JsonServerColumns.loadColumns();
        setColumns(loadedColumns);
      } catch (error) {
        console.error("Erreur lors du chargement des colonnes :", error);
      }
    };

    // Fonction async pour charger les cartes depuis le Jsonserv
    const fetchCards = async () => {
      try {
        const loadedCards = await JsonServerCards.loadCards();
        setCards(loadedCards);
      } catch (error) {
        console.error("Erreur lors du chargement des cartes :", error);
      }
    };

    // Appele les fonctions pour charger les données
    fetchTerms();
    fetchColumns();
    fetchCards();
  }, []);

  // Gestion du du clic sur un terme
  const handleTermClick = (term) => {
    setSelectedTerm(term.id); // Mettre à jour le terme sélectionné
  };

  // Fonction pour ajouter un terme
  const handleAddTerm = async () => {
    try {
      const addedTerm = await JsonServerTerms.addTerm({
        name: newTerm
      });
      setTerms([...terms, addedTerm]); // add le terme à la liste
      setNewTerm(""); // rénitisalisation du champ du nom du terme
    } catch (error) {
      console.error("Erreur lors de l'ajout du terme :", error);
    }
  };

  // Fonction pour supprimer un terme
  const handleDeleteTerm = async (termId) => {
    try {
      await JsonServerTerms.deleteTerm(termId);
      setTerms(terms.filter((term) => term.id !== termId)); // Filtre sur les termes afin de supprimer celui avec l'ID selectioné
    } catch (error) {
      console.error("Erreur lors de la suppression du terme :", error);
    }
  };

  // Filtre des cards en fonction de la colonne & du terme szlectionné
  const getCardsByColumnIdAndTerm = (columnId, termId) => {
    return cards.filter(
      (card) => card.column === columnId && (termId === "" || card.tid === termId)
    );
  };

  // Fonction pour ajouter une carte
  const handleAddCard = async () => {
    try {
      const addedCard = await JsonServerCards.addCard({
        ...newCard,
        term: selectedTerm // Utiliser le terme sélectionné
      });
      setCards([...cards, addedCard]); // ajout card a la liste
      setNewCard({
        question: "",
        answer: "",
        column: "",
        term: ""
      }); // Réinitialisation du form d'ajout de la card
    } catch (error) {
      console.error("Erreur lors de l'ajout de la carte :", error);
    }
  };

  // Fonction pour supprimer une carte
  const handleDeleteCard = async (cardId) => {
    try {
      await JsonServerCards.deleteCard(cardId);
      setCards(cards.filter((card) => card.id !== cardId)); // Filtrer les cartes pour supprimer celle avec l'ID donné
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte :", error);
    }
  };

  
  return (
    <div>
      <h1>MEMO</h1>

      {/* traitement d'ajout du nouveau terme */}
      <div className="mb-3">
        <label htmlFor="newTerm" className="form-label">
          Nouveau terme
        </label>
        <input
          type="text"
          className="form-control"
          id="newTerm"
          value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
        />
      </div>

    
      <button
        className="btn btn-success mb-3"
        onClick={handleAddTerm}
      >
        Ajouter un terme
      </button>

      {/* Liste des termes */}
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
            <button onClick={() => handleDeleteTerm(term.id)} className="btn btn-sm btn-danger">x</button>

            </span>
          ))}
      </div>




      {/* Formulaire pour ajouter une carte */}
      <div>
  <h3>Ajouter une carte</h3>
  <form>
    <div className="row gx-2">
      <div className="col-md-6 mb-3">
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
      <div className="col-md-6 mb-3">
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
    </div>
    <div className="row gx-2">
      <div className="col-md-6 mb-3">
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
      <div className="col-md-6 mb-3">
        <label htmlFor="term" className="form-label">
          Terme
        </label>
        <select
          className="form-select"
          id="term"
          value={newCard.tid}
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
    </div>
    <button type="button" className="btn btn-primary" onClick={handleAddCard}>
      Ajouter
    </button>
  </form>
</div>






      {/* Affichage des colonnes et des cartes */}
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
