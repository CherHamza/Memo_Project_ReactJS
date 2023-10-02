export default class JsonServer {
    static url = "http://localhost:3001/users";

    static async loadUser() {
        return fetch(JsonServer.url)
        .then(response => {
            console.log(`response.status`, response.status);
            if (response.status !== 200) throw new Error("Erreur dans le loadUser")
            return response.json();
        })
        .then((user) => {
            const findUser = user[0];
            console.log(findUser);
          return user;
        })
        .catch((error) => {
          console.error(`Erreur attrapée dans loadUser : ` + error);
        });
    
    }

}