import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import MovieDetails from "./Components/MovieDetails/MovieDetails";
import NotFound from "./Components/NotFound/NotFound";
import Movie from "./Components/Movie/Movie";
import TV from "./Components/TV/TV";
import Main from "./Components/Main/Main";
import Profile from "./Components/Profile/Profile";
import { Offline } from "react-detect-offline";
import offlineAnimation from "./Components/images/offline.json";
import Lottie from "lottie-react";

export function App() {
  

  // for searching


  const router = createBrowserRouter([
    {
      path: "",
      element: <Main />,
      children: [
        {
          path: "",
          element: (
            <Protectedroute>
              <Home />
            </Protectedroute>
          ),
        },
        {
          path: "home",
          element: (
            <Protectedroute>
              <Home />
            </Protectedroute>
          ),
        },
        {
          path: "movies",
          element: (
            <Protectedroute>
              <Movie  />
            </Protectedroute>
          ),
        },
        {
          path: "tv",
          element: (
            <Protectedroute>
              <TV />
            </Protectedroute>
          ),
        },
        {
          path: "moviedetails",
          element: (
            <Protectedroute>
              <MovieDetails />
            </Protectedroute>
          ),
          children: [{ path: ":media", children: [{ path: ":id" }] }],
        },
        {
          path: "profile",
          element: (
            <Protectedroute>
              <Profile  />
            </Protectedroute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login  /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  // to protected route

  function Protectedroute(props) {
    if (localStorage.getItem("tkn") == null) {
      return <Navigate to="/login" />;
    } else {
      return <>{props.children}</>;
    }
  }


 

  return (
    <>
      <Offline>
        <div
          className="w-75 "
          style={{
            position: "fixed",
            zIndex: "1000",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <Lottie
            style={{ height: "500px" }}
            animationData={offlineAnimation}
          ></Lottie>

          <div
            className="bg-danger border border-2 p-2"
            style={{ position: "absolute", bottom: "-43px", left: "150spx" }}
          >
            <h1>opps your internet has been lost</h1>
          </div>
        </div>
      </Offline>
      <RouterProvider router={router} />
    </>
  );
}
