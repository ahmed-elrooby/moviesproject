import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { Context } from "../../Context/ContextFunction";
function Header() {
  // { current, remove, search }
  const {search,remove,tok} = useContext(Context)
  const navigate = useNavigate();

  function logout() {
    let pro = window.confirm("are you sure to log out ");
    if (pro) {
      remove();
      navigate("/login");
    }
  }

  const onSearch = (word) => {
    search(word);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark position-relative ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Noxe
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* ms ==> left     &&    me==> end => right */}
            {tok ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="movies">
                    Movies
                  </Link>
                </li>
                <li className="nav-item text-light">
                  <Link className="nav-link " aria-current="page" to="tv">
                    TV
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center align-items-md-start fw-bold">
              <li className="nav-item  ">
                <i className="fa-brands me-2 fa-facebook-f "></i>
                <i className="fa-brands me-2 fa-twitter"></i>
                <i className="fa-brands me-2 fa-instagram"></i>
                <i className="fa-brands me-2 fa-spotify"></i>
              </li>
              {tok ? (
                <>
                  <li className="nav-item fw-bold ">
                    <span
                      onClick={logout}
                      className="nav-link "
                      style={{ cursor: "pointer" }}
                      aria-current="page"
                    >
                      <i class="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                      LogOut
                    </span>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white"
                      aria-current="page"
                      to="profile"
                    >
                      <motion.i
                        initial={{ scale: 0.9 }}
                        transition={{
                          duration: 0.2,
                          type: "spring",
                          stiffness: 100,
                          mass: 0.5,
                          damping: 3,
                        }}
                        whileHover={{
                          scale: 1.1,
                          color: "#1ABCFE",
                        }}
                        class="prof fa-solid fa-user fa-2x me-2"
                      ></motion.i>{" "}
                    </Link>
                  </li>

                  <form className="d-flex" role="search">
                    <input
                      onChange={(e) => onSearch(e.target.value)}
                      className="form-control me-2 w-50"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button
                      className="btn btn-outline-info text-white"
                      type="submit"
                    >
                      Search
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
