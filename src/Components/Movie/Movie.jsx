import React, { useContext } from "react";
import MovieCss from "./Movie.module.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loaddingAnimation from "../images/loadding.json";
import { motion } from "framer-motion";
import { Context } from "../../Context/ContextFunction";
import { Helmet } from "react-helmet";

function Movie() {
  const {allmovies} = useContext(Context);
  return (
    <>
      {allmovies !== null ? (
        <div className="container pt-4">
              <Helmet>
<title>Movies Page</title>
<meta name="description" content="Movies Page"/>

    </Helmet>
          <div className="row mt-5">
            {allmovies.length >= 1 ? (
              allmovies.map((mov, idx) => (
                <motion.div
                  initial={{ scale: 0.6 }}
                  transition={{
                    duration: 0.2,
                    type: "spring",
                    stiffness: 100,
                    mass: 0.5,
                    damping: 3,
                  }}
                  whileInView={{
                    scale: 1,
                  }}
                  whileHover={{
                    scale: 1.1,
                  }}
                  key={idx}
                  className=" col-md-3"
                >
                  <Link to={`/moviedetails/movie/${mov.id}`}>
                    <div className={MovieCss.movie}>
                      <img
                        className="w-100"
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          mov.poster_path
                        }
                        alt=""
                      />
                      <div className={MovieCss.data}>
                        <h3 className={MovieCss.name}> {mov.title}</h3>
                      </div>

                      <span className={MovieCss.vote}>
                        {Math.round(mov.vote_average)} / 10
                        </span>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <h1 className="vh-100 d-flex justify-content-center text-capitalize align-items-center">
                there is no movie
              </h1>
            )}
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

export default Movie;
