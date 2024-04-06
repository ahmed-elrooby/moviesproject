// import axios from 'axios';
import Joi from "joi";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import registeranimation from "../images/register.json";
import axios from "axios";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

function Register() {
  const navigate = useNavigate();
  const [apimessage, setApimessage] = useState("");
  const [error, setError] = useState(null);
  const [reloadButton, setReloadButton] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  //onchange ==> when he write get data and make it inside variable  === syntax of events in react js write as camel case

  // function to get data from input that user write
  //first function
  function getUser(e) {
    setError(null);
    setApimessage("");
    let elemnetValue = e.target.value;

    let newUser = { ...user };
    let elementName = e.target.id;
    newUser[elementName] = elemnetValue;
    setUser(newUser);
  }

  function specificError(key) {
    if (error !== null) {
      for (let i = 0; i < error.length; i++) {
        if (error[i].context.key === key) {
          return error[i].message;
        }
      }
      return "";
    }
  }

  //third function to call api
  async function sendUser() {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        user
      );
      if (data.message === "success") {
        navigate("/login");
      } else {
      }
    } catch (error) {
      setApimessage(error.response.data.message);
    }
    setReloadButton(false);
  }

  // second function  to make validation

  function submitUser(e) {
    setReloadButton(true);
    e.preventDefault();

    const schema = Joi.object({
      name: Joi.string().min(7).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,9}$/)
        .required(),
      rePassword: Joi.string().valid(Joi.ref("password")).required(),
      phone: Joi.string()
        .pattern(/^01[0125][0-9]{8}$/)
        .required(),
    });
    const joiresponse = schema.validate(user, { abortEarly: false });
    if (joiresponse.error === undefined) {
      sendUser();
      //call api
    } else {
      setError(joiresponse.error.details);
      setReloadButton(false);
    }
  }

  //make validation

  return (
    <>
      <div className="container">
        <motion.div
          initial={{ scale: 0.4 }}
          transition={{
            duration: 0.2,
            type: "spring",
            stiffness: 100,
            mass: 0.5,
            damping: 2,
          }}
          whileInView={{
            scale: 1,
          }}
          className="row align-items-center"
        >
          <Helmet>
            <title>Register page</title>
            <meta name="description" content=" Register Page" />
          </Helmet>

          <div className="col-md-8">
            <div className="w-100 m-auto py-3">
              {apimessage.length === 0 ? (
                ""
              ) : (
                <div className="alert alert-danger"> {apimessage} </div>
              )}

              <h3 className="mb-3">Registeration Form</h3>
              <form action="" onSubmit={submitUser}>
                <label htmlFor="name">name</label>
                <input
                  onChange={getUser}
                  className="form-control mb-3"
                  type="text"
                  id="name"
                  placeholder="full_name"
                />
                {specificError("name") ? (
                  <div className="alert alert-danger">
                    {specificError("name")}
                  </div>
                ) : (
                  ""
                )}
                <label htmlFor="email">email</label>
                <input
                  onChange={getUser}
                  className="form-control mb-3"
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                />
                {specificError("email") ? (
                  <div className="alert alert-danger">
                    {specificError("email")}
                  </div>
                ) : (
                  ""
                )}

                <label htmlFor="password">password</label>
                <input
                  onChange={getUser}
                  className="form-control mb-3"
                  type="password"
                  id="password"
                  placeholder="password"
                />

                {specificError("password") ? (
                  <div className="alert alert-danger">
                    Password must be between 3 to 9 characters long and can only
                    contain letters and numbers.
                  </div>
                ) : (
                  ""
                )}

                <label htmlFor="rePassword">confirm password</label>
                <input
                  onChange={getUser}
                  className="form-control mb-3"
                  type="password"
                  id="rePassword"
                  placeholder="confirm password"
                />
                {specificError("rePassword") ? (
                  <div className="alert alert-danger">
                    'Passwords do not match.
                  </div>
                ) : (
                  ""
                )}

                <label htmlFor="phone">phone</label>
                <input
                  onChange={getUser}
                  className="form-control mb-3"
                  type="tel"
                  id="phone"
                  placeholder="enter phone"
                />
                {specificError("phone") ? (
                  <div className="alert alert-danger">
                    {specificError("phone")}
                  </div>
                ) : (
                  ""
                )}

                <button className="btn btn-outline-info">
                  {reloadButton === false ? (
                    "Register"
                  ) : (
                    <i className="fa-solid fa-spinner fa-spin "></i>
                  )}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="lottie">
              <Lottie animationData={registeranimation}></Lottie>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Register;
