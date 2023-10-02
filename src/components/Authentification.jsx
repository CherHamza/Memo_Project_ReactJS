import React, { useState, useEffect } from 'react';
import JsonServer from './../services/JsonServer';
import { loadUser } from '../actions/user';


  function Authentification() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await JsonServer.loadUser();
          setUsers(userData);
        } catch (error) {
          console.error('Erreur lors du chargement de la base de données JSON : ', error);
        }
      };
  
      fetchData();
    }, []);

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };


  
  const handleSubmit = (e) => {
    e.preventDefault();   
    console.log('Username:', username);
  console.log('Password:', password);
  console.log('Données de la base de données :', users);
    console.log('form e.target', e.target[0].value)
    console.log('Jsonserver', JsonServer.loadUser())




    
    
// Search user(u) dans db
const user = users.find((u) => u.username === username && u.password === password);




    if (user) {
      setIsLoggedIn(true);
      alert('Connexion réussie !');
    } else {
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
   };


  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default Authentification;
