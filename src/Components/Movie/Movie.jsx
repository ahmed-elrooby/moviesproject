import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieCss from "./Movie.module.css"
import { Link } from 'react-router-dom';

function Movie() {
    const [allmovies, setAllmovies] = useState(null);
    async function movies() {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=0bd0730b59625b4570f8f531b92473f1"
      );
      setAllmovies(data.results);
    }
    useEffect(() => {
        movies();
      }, []);
  return     <>
  {allmovies !== null ? (
    <div className="container pt-4">
      <div className="row">

        {allmovies.map((mov, idx) => (
          <div key={idx} className="col-md-3">
            <Link to={`/moviedetails/tv/${mov.id}`}>
                          <div className="movie position-relative">
              <img
                className="w-100"
                src={
                  "https://image.tmdb.org/t/p/original/" + mov.poster_path
                }
                alt=""
              />
              <h4>{mov.title}</h4>
              <span className={MovieCss.vote}>
                {(mov.vote_average).toFixed(1)} / 10
              </span>
            </div>
            </Link>

          </div>
        ))}
      </div>


    </div>
  ) : (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
    </div>
  )}
</>
  
}

export default Movie
