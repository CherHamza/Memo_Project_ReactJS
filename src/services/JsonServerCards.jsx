// JsonServerCards.js
export default class JsonServerCards {
    static url = "http://localhost:3001/cards";
  
    static async loadCards() {
      return fetch(JsonServerCards.url)
        .then((response) => {
          if (response.status !== 200)
            throw new Error("Erreur lors du chargement des cartes");
          return response.json();
        })
        .then((cards) => {
          console.log("Cartes chargées :", cards);
          return cards;
        })
        .catch((error) => {
          console.error("Erreur attrapée dans loadCards : " + error);
        });
    }
  
    static async addCard(newCard) {
      try {
        const response = await fetch(JsonServerCards.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCard),
        });
  
        if (!response.ok) {
          throw new Error("Erreur lors de l'ajout de la carte");
        }
  
        const addedCard = await response.json();
        return addedCard;
      } catch (error) {
        console.error("Erreur attrapée dans addCard : " + error);
        throw error;
      }
    }
  
    static async deleteCard(cardId) {
      try {
        const response = await fetch(`${JsonServerCards.url}/${cardId}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de la carte");
        }
      } catch (error) {
        console.error("Erreur attrapée dans deleteCard : " + error);
        throw error;
      }
    }
  }
  