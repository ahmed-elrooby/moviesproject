import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loaddingAnimation from "../images/loadding.json";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function MovieDetails() {
  const [details, setDetails] = useState(null);
  let { id, media } = useParams();

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
              <Helmet>
              <title>{`${details.name || details.title} ${media === "tv" ? "TV" : "Movie"}`}</title>
<meta name="description" content="my home page"/>

    </Helmet>
          <div className="row mt-5 text-capitalize">
            <motion.div
              initial={{ x: -100 }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 100,
                mass: 0.5,
                damping: 3,
              }}
              whileInView={{
                x: 0,
              }}
              className="col-md-3"
            >
              <motion.img
                initial={{ scale: 1 }}
                transition={{
                  duration: 0.2,
                  type: "spring",
                  stiffness: 100,
                  mass: 0.5,
                  damping: 3,
                }}
                whileHover={{
                  scale: 1.1,
                }}
                className="w-100"
                src={`https://image.tmdb.org/t/p/original/${details.poster_path}`}
                alt=""
              />
            </motion.div>
            <motion.div
              initial={{ x: 100 }}
              transition={{
                duration: 0.2,
                type: "spring",
                stiffness: 100,
                mass: 0.5,
                damping: 3,
              }}
              whileInView={{
                x: 0,
              }}
              className="col-md-9"
            >
              <div className="moviedetails d-flex flex-column gap-2">
                {media === "tv" ? (
                  <h4 className="text-info">{details.name}</h4>
                ) : (
                  <h4 className="text-info">{details.title}</h4>
                )}
                <p>{details.tagline}</p>
                <div className="hashtag d-flex gap-3 flex-wrap">
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
                <p
                  style={{
                    color: "#ffffff85",
                    fontSize: "16px",
                    lineHeight: "1.5",
                  }}
                >
                  {details.overview}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Lottie animationData={loaddingAnimation}></Lottie>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
