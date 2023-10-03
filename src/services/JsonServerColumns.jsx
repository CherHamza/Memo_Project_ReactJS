
export default class JsonServerColumns {
    static url = "http://localhost:3001/columns";
  
    static async loadColumns() {
      return fetch(JsonServerColumns.url)
        .then((response) => {
          if (response.status !== 200) throw new Error("Erreur lors du chargement des colonnes");
          return response.json();
        })
        .then((columns) => {
            console.log("Termes chargés :", columns);
            return columns;
         
        })
        .catch((error) => {
          console.error("Erreur attrapée dans loadColumns : " + error);
        });
    }
  }
  