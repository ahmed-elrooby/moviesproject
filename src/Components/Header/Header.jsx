import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Header.css";
function Header({ current,remove }) {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // let { id, media } = useParams();

function logout(){
  let pro = window.confirm("are you sure to log out ")
  if(pro){
    remove();
    navigate("/login")
  }

}

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=0bd0730b59625b4570f8f531b92473f1&query=${value}`
      );
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
            {current  ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="movies"
                  >
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="tv">
                    TV
                  </Link>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center align-items-md-start">
              <li className="nav-item  ">
                <i className="fa-brands me-2 fa-facebook-f"></i>
                <i className="fa-brands me-2 fa-twitter"></i>
                <i className="fa-brands me-2 fa-instagram"></i>
                <i className="fa-brands me-2 fa-spotify"></i>
              </li>
              {current ? (<>
                <li className="nav-item">
                  <span onClick={logout} className="nav-link active"  style={{cursor:"pointer"}} aria-current="page">
                    Logedout
                  </span>
                </li>
                <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="profile"
                    >
                      Profile
                    </Link>
                  </li>

                  <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2 w-50"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleChange}
                value={value}
              />
              <button className="btn btn-outline-info text-white" type="submit">
                Search
              </button>
            </form>
              </>

              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
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

      {value && data.length > 0 && (
        <div className="dropdown-content">
          <div className="container">
            <div className="row">
              {value &&
                data
                  .filter(
                    (item) =>
                      item.title.toLowerCase().includes(value.toLowerCase()) &&
                      item.title !== value
                  )
                  .map((item) => (
                    <Link
                      className="col-md-3 position-relative"
                      key={item.id}
                      onClick={(e) => setValue(item.title)}
                      to="/moviedetails"
                    >
                      <img
                        className="w-100"
                        src={
                          "https://image.tmdb.org/t/p/original/" +
                          item.poster_path
                        }
                        alt=""
                      />
                      <h5>{item.title}</h5>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
