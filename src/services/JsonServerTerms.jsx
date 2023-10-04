// JsonServerTerms.js
export default class JsonServerTerms {
    static url = "http://localhost:3001/terms";
  
    static async loadTerms() {
      return fetch(JsonServerTerms.url)
        .then((response) => {
          if (response.status !== 200) throw new Error("Erreur dans le chargement des termes");
          return response.json();
        })
        .then((terms) => {
          console.log("Termes chargés :", terms);
          return terms;
        })
        .catch((error) => {
          console.error("Erreur attrapée dans loadTerms : " + error);
        });
    }
    static async addTerm(newTerm) {
      try {
        const response = await fetch(JsonServerTerms.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTerm),
        });
  
        if (!response.ok) {
          throw new Error("Erreur lors de l'ajout du terme");
        }
  
        const addedTerm = await response.json();
        return addedTerm;
      } catch (error) {
        console.error("Erreur attrapée dans addTerm : " + error);
        throw error;
      }
    }
  
    static async deleteTerm(termId) {
      try {
        const response = await fetch(`${JsonServerTerms.url}/${termId}`, {
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression du terme");
        }
      } catch (error) {
        console.error("Erreur attrapée dans deleteTerm : " + error);
        throw error;
      }
    }
  
  }
  