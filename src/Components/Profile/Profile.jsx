import Lottie from "lottie-react";
import React, { useContext } from "react";
import animateProfile from "../images/profile.json";
import { motion } from "framer-motion";
import { Context } from "./../../Context/ContextFunction";
import { Helmet } from "react-helmet";

function Profile() {
  const { tok } = useContext(Context);
  return (
    <>
      <div className=" container align-items-center d-flex justify-content-center align-items-center m-auto vh-75">
        <Helmet>
          <title className="text-capitalize">Profile page</title>
          <meta name="description" content="Profile Page" />
        </Helmet>
        <motion.div
          initial={{ y: -100 }}
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 100,
            mass: 0.5,
            damping: 3,
          }}
          whileInView={{
            y: 0,
          }}
          className="row mt-5 border  "
          style={{ height: "360px", width: "300px" }}
        >
          <Lottie
            animationData={animateProfile}
            style={{ height: "200px" }}
          ></Lottie>
          <h2 className="px-3 py-2 d-flex justify-content-center text-light fw-bold rounded-2 w-100">
            Hi,
            <span className="text-white">{tok.name.toUpperCase()}!</span>
          </h2>
        </motion.div>
      </div>
    </>
  );
}

export default Profile;
