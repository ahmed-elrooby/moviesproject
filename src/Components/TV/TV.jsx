import React, { useContext } from "react";
import { Link } from "react-router-dom";
import tvCss from "./TV.module.css";
import Lottie from "lottie-react";
import loaddingAnimation from "../images/loadding.json";
import notfound from "../images/not exist.json";
import { motion } from "framer-motion";
import { Context } from "../../Context/ContextFunction";
import { Helmet } from 'react-helmet';

function TV() {
  const {alltv} = useContext(Context)
  return (
    <>
      {alltv !== null ? (
        <div className="container pt-4">
          <div className="row m-5">
          <Helmet>
<title> Tv Page</title>
<meta name="description" content=" Tv Page"/>

    </Helmet>
            {alltv.length >= 1 ? (
              alltv.map((tvs, idx) => (
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
                  <Link to={`/moviedetails/tv/${tvs.id}`}>
                    <div className={tvCss.tv}>
                      <img
                        className="w-100"
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          tvs.poster_path
                        }
                        alt=""
                      />
                      <div className={tvCss.data}>
                        <h3 className={tvCss.name}> {tvs.name}</h3>
                      </div>

                      <span className={tvCss.vote}>
                      {tvs && tvs.vote_average?.toFixed(1)} / 10
                        </span>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className=" d-flex justify-content-center align-items-center">
              <Lottie animationData={notfound}
              style={{height:"400px"}}
              ></Lottie>
            </div>
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

export default TV;
