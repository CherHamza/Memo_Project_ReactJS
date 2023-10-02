import { Outlet , Link} from 'react-router-dom';

function App() {
  return (
    <div className="App container">
    <header>
     <nav>
      <ul className='list-unstyled d-flex gap-4'>
        <li><Link to="/" >Memo</Link></li>
        <li><Link to="/Authentification">Login</Link></li>
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