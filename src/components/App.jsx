// App.js

import { Link, Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/authentification');
  };

  return (
    <div className="App container">
      <header>
        <nav>
          <ul className='list-unstyled d-flex gap-4'>
            {isLoggedIn ? (
              <li>
                <button onClick={handleLogout}>Déconnexion</button>
              </li>
            ) : (
              <li><Link to="/authentification">Login</Link></li>
            )}
            <li><Link to="/memo">Memo</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
