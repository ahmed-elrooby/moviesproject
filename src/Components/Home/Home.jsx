import axios from "axios";
import React, { useEffect, useState } from "react";
import home from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [allmovies, setAllmovies] = useState(null);
  const [alltv, setAlltv] = useState(null);
  async function movies() {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=0bd0730b59625b4570f8f531b92473f1"
      );
      setAllmovies(data.results);
    }
     catch (error) {
      console.error("error",error)
      
    }
  }


  async function getTv() {
    try{
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=0bd0730b59625b4570f8f531b92473f1"
      );
      setAlltv(data.results)
    }catch(error){
      console.error("error",error)

    }
  }
  useEffect(() => {
    movies();
    getTv();
  }, []);

  return (
    <>
      {allmovies && alltv !== null ? (
        <div className="container pt-4">
          <div className="row align-items-center">
            <div className="col-md-3 text-capitalize  py-md-5 mt-md-4 mb-md-4">
              <div className={home.title}>
                <h5>trending movies to watch</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              </div>
            </div>

            {allmovies.map((movie, idx) => (
              <div key={idx} className="col-md-3">
                <Link to={`/moviedetails/movie/${movie.id}`}>
                  <div className="movie position-relative">
                    <img
                      className="w-100"
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        movie.poster_path
                      }
                      alt=""
                    />
                    <h4>{movie.title}</h4>
                    <span className={home.vote}>
                      {movie.vote_average.toFixed(1)} / 10
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="row align-items-center">
            <div className="col-md-3 text-capitalize py-md-5 mt-md-4 mb-md-4">
              <div className={home.title}>
                <h5>trending TV to watch</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              </div>
            </div>
            {alltv.map((tvshow, idx) => (
              <div key={idx} className="col-md-3">
                <Link to={`/moviedetails/tv/${tvshow.id}`}>
                <div className="tv position-relative">
                  <img
                    className="w-100"
                    src={
                      "https://image.tmdb.org/t/p/original/" +
                      tvshow.poster_path
                    }
                    alt="tv"
                  />
                  <h4>{tvshow.name}</h4>
                  <span className={home.vote}>
                    {tvshow.vote_average.toFixed(1)} / 10
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
  );
};

export default Home;
