// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header>
      <nav>
        <ul className='list-unstyled d-flex gap-4'>
          {isLoggedIn ? (
            <li>
              <button onClick={logout}>Déconnexion</button>
            </li>
          ) : (
            <li><Link to="/authentification">Login</Link></li>
          )}
          <li><Link to="/memo">Memo</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
