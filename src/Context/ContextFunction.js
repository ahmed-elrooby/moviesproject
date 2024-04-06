import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode";
import {Navigate} from "react-router-dom"


export const Context = createContext();




export function ContextFunction(props){
    const [allmovies, setAllmovies] = useState(null);
    const [alltv, setAlltv] = useState(null);
    const [tok, setTok] = useState(null);

  
    //movies function
    // movies
  
    async function movies() {
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=0bd0730b59625b4570f8f531b92473f1"
        );
        setAllmovies(data.results);
      } catch (error) {
        console.error("error", error);
      }
    }
  
    // ---------------------------------------
    // tv
    async function tv() {
      try {
        const { data } = await axios.get(
          "https://api.themoviedb.org/3/trending/tv/day?api_key=0bd0730b59625b4570f8f531b92473f1"
        );
        setAlltv(data.results);
      } catch (error) {
        console.error("error", error);
      }
    }
  
    // search

    async function search(word) {
        if (word === "") {
          tv();
          movies();
        } else {
          try {
            const { data } = await axios.get(
              `https://api.themoviedb.org/3/search/multi?api_key=0bd0730b59625b4570f8f531b92473f1&query=${word}`
            );
            setAllmovies(data.results);
            setAlltv(data.results);
          } catch (error) {
            console.error("Error:", error);
          }
        }
      }
    useEffect(() => {
      movies();
      tv();
    }, []);
    //remove data

    function RemoveData() {
        localStorage.removeItem("tkn");
        setTok(null);
      }
//getlogged

      function getlogged() {
        if (localStorage.getItem("tkn") !== null) {
          let tokn = localStorage.getItem("tkn");
          let userdate = jwtDecode(tokn);
          setTok(userdate);
        }
      }


    //   reload 

    function reload() {
        if (localStorage.getItem("tkn") !== null && tok === null) {
          getlogged();
          <Navigate to="/home" />;
        }
      }
    
      useEffect(() => {
        reload();
      }, []);

    return<Context.Provider value={{allmovies:allmovies,alltv:alltv,getlogged:getlogged,setAllmovies:setAllmovies,setAlltv:setAlltv,movies:movies,tv:tv,search:search,tok:tok,setTok:setTok,RemoveData:RemoveData}}>

    {props.children}
    </Context.Provider>
}