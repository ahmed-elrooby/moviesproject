import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import "./Header.css"
function Header() {
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0bd0730b59625b4570f8f531b92473f1&query=${value}`);
        const json = await response.json();
        setData(json.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  return <>
  <nav className="navbar navbar-expand-lg navbar-dark position-relative ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

{/* ms ==> left     &&    me==> end => right */}
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">




      <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="tv">TV</Link>
        </li>


      </ul>

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center align-items-md-start">
      <li className='nav-item  '>
          <i className='fa-brands me-2 fa-facebook-f'></i>
          <i className='fa-brands me-2 fa-twitter'></i>
          <i className='fa-brands me-2 fa-instagram'></i>
          <i className='fa-brands me-2 fa-spotify'></i>
         </li>
      <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
        </li>
      </ul>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange} value={value} />
        <button className="btn btn-outline-info text-white" type="submit">Search</button>
        
      </form>

    </div>

  </div>
</nav>





{value && data.length > 0 &&  (
  
<div className="dropdown-content">
  <div className="container">
      <div className="row">
  {
          value &&
        data.filter((item)=> item.title.toLowerCase().includes(value.toLowerCase()) && item.title !== value)
        .map(item => (
          <div className="col-md-3 position-relative" key={item.id} onClick={(e)=> setValue(item.title)}>
            <img className='w-100' src={ "https://image.tmdb.org/t/p/original/" + item.poster_path} alt="" />
            <h5>{item.title}</h5>
          </div>
        ))}
  </div>
  </div>

       
      </div>
)
        }
  </>
}

export default Header;
