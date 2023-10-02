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
  }
  