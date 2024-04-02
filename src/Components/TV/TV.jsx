import React, { useEffect } from 'react'
import axios from 'axios'
import  {  useState } from 'react'
import "./TV.css"
import { Link } from 'react-router-dom';

function TV() {
    const [allTv, setAllTv] = useState(null);
    async function alltv() {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=0bd0730b59625b4570f8f531b92473f1"
      );
      setAllTv(data.results);
    }
    useEffect(() => {
        alltv();
      }, []);
  return <>
  
  {allTv !== null ? (
    <div className="container pt-4">
      <div className="row">

        {allTv.map((tvs, idx) => (
          <div key={idx} className="col-md-3">
                        <Link to={`/moviedetails/tv/${tvs.id}`}>

            <div className="movie position-relative">
              <img
                className="w-100"
                src={
                  "https://image.tmdb.org/t/p/original/" + tvs.poster_path
                }
                alt=""
              />
              <h4>{tvs.name}</h4>
              <span className="vote">
                {(tvs.vote_average).toFixed(1)} / 10
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

export default TV
