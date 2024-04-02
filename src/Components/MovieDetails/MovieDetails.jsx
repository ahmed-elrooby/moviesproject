import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const [details, setDetails] = useState(null);
  let { id, media } = useParams();
  console.log(media);

  async function getDetails() {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media}/${id}?api_key=0bd0730b59625b4570f8f531b92473f1&language=en-US`
    );
    setDetails(data);
  }
  useEffect(() => {
    getDetails();
  }, []);

  return (
    <>
      {details ? (
        <div className="container w-100">
          <div className="row text-capitalize">
            <div className="col-md-3">
              <img
                className="w-100"
                src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
                alt=""
              />
            </div>
            <div className="col-md-9">
              <div className="moviedetails d-flex flex-column gap-2">
                <h4 className="text-info">{details.title}</h4>
                <p>{details.tagline}</p>
                <div className="hashtag d-flex gap-3">
                  {details.genres.map((hash, idx) => (
                    <span key={idx} className="bg-info px-4 py-1 rounded">
                      {hash.name}
                    </span>
                  ))}
                </div>
                <h5>
                  {" "}
                  vote : {details.vote_average.toFixed(1)}{" "}
                  <i style={{ color: "yellow" }} class="fa-solid fa-star"></i>{" "}
                </h5>
                <h5> vote count : {details.vote_count}</h5>
                <h5> popularity : {details.popularity}</h5>
                <h5> release date : {details.release_date}</h5>
                <p style={{ color: "#ffffff85" }}>{details.overview}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i className="fa-solid fa-spinner fa-spin fa-7x text-white"></i>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
