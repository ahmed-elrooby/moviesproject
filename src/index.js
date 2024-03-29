import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/js/bootstrap.bundle"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import NotFound from './Components/NotFound/NotFound';
import Movie from './Components/Movie/Movie';
import TV from './Components/TV/TV';


const router = createBrowserRouter([
  {path:"",element:<App />,children:[
    {path:"",element:<Home />},
    {path:"home",element:<Home />},
    {path:"about",element:<About />},
    {path:"register",element:<Register />},
    {path:"login",element:<Login />},

    {path:"movies",element:<Movie />},
    {path:"tv",element:<TV />},
    {path:"moviedetails",element:<MovieDetails />,children:[
      {path:":media",children:[
        {path:":id"}
      ]}
    ]},
 
    {path:"*",element:<NotFound />},
  ]}
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
