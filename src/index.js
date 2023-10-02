import App from './components/App';
// import Articles from './components/Articles';
import 'bootstrap/dist/css/bootstrap.css';
// import '~bootstrap/scss/bootstrap';
// import './style/index.scss';
import Authentification from './components/Authentification';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { loadUser } from './actions/user';
import Memo from './components/Memo';
// import loaderArticles from './loaders/articles';
// import { actionAdd } from './actions/articles';


const root = ReactDOM.createRoot(
  document.getElementById('root') 
);
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} >
        <Route path="/Authentification" element={<Authentification />}  action={loadUser}/>
        <Route path="/Memo" element={<Memo />}  action={loadUser}/>


        {/* <Route path="articles" element={<Articles />} loader={loaderArticles} /> */}
      </Route>  
     
    </>
  )
)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();