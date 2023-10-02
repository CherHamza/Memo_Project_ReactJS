import React, { useState, useEffect } from 'react';
import JsonServerUser from '../services/JsonServerUser';
import { useNavigate } from 'react-router-dom'; 

function Authentification() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        console.log(isLoggedIn);
       
        const userData = await JsonServerUser.loadUser();
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

    // Search user(u) dans db
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      setIsLoggedIn(true); 
      if (isLoggedIn === true) {
        
        alert('Connexion réussie !');
      navigate('/Memo');
      }
     

      
    } else {
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
  
     
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Connexion</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Nom d'utilisateur:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Connexion</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div> 
    </div>
    
  );

}


export default Authentification;
