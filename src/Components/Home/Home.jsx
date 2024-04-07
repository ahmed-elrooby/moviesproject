import React, { useContext } from "react";
import home from "./Home.module.css";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loaddingAnimation from "../images/loadding.json";
import { motion } from "framer-motion";
import { Context } from "../../Context/ContextFunction";
import { Helmet } from "react-helmet";
import notfound from "../images/not exist.json";


const Home = () => {
  const { allmovies, alltv } = useContext(Context);
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content=" Home Page" />
      </Helmet>
      {allmovies && alltv !== null ? (
        <div className="container pt-4"> 
                   {alltv .length && allmovies.length >= 1 ?<>
                    <div className="row mt-5 align-items-center">
            
            <div className="col-md-3 text-capitalize  py-md-5 mt-md-4 mb-md-4">
              <div className={home.title}>
                <h5>trending movies to watch</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              </div>
            </div>

            {
              allmovies.map((movie, idx) => (
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
                  className="col-md-3"
                >
                  <Link to={`/moviedetails/movie/${movie.id}`}>
                    <div className={home.movie}>
                      <img
                        className="w-100"
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          movie.poster_path
                        }
                        alt=""
                      />
                      <div className={home.data}>
                        <h4 className={home.name}>{movie.title}</h4>
                      </div>
                      <span className={home.vote}>
                      {movie && movie.vote_average?.toFixed(1)} / 10
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))
             }
          </div>
          <div className="row align-items-center">
            <div className="col-md-3 text-capitalize py-md-5 mt-md-4 mb-md-4">
              <div className={home.title}>
                <h5>trending TV to watch</h5>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
              </div>
            </div>
{
              alltv.map((tvshow, idx) => (
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
                  className="col-md-3"
                >
                  <Link to={`/moviedetails/tv/${tvshow.id}`}>
                    <div className={home.tv}>
                      <img
                        className="w-100"
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          tvshow.poster_path
                        }
                        alt="tv"
                      />
                      <div className={home.data}>
                        <h4 className={home.name}>{tvshow.name}</h4>
                      </div>
                      <span className={home.vote}>
                      {tvshow && tvshow.vote_average?.toFixed(1)} / 10
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))
            
            }
          </div>
        
                   </>:(
              <div className=" d-flex justify-content-center align-items-center">
              <Lottie animationData={notfound}
              style={{height:"400px"}}
              ></Lottie>
            </div>
            )}
 
      </div>) : (
        <div className=" d-flex justify-content-center align-items-center">
          <Lottie animationData={loaddingAnimation}></Lottie>
        </div>
      )}
    </>
  );
};

export default Home;
