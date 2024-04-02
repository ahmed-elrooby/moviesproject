import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import NotFound from './Components/NotFound/NotFound';
import Movie from './Components/Movie/Movie';
import TV from './Components/TV/TV';
import Main from './Components/Main/Main';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Profile from './Components/Profile/Profile';
import { Offline } from 'react-detect-offline';
import offlineAnimation from "./Components/images/offline.json"
import Lottie from 'lottie-react';




export function App() {



  const [tok, setTok] = useState(null)

  const router = createBrowserRouter([
    {path:"",element:<Main remove={RemoveData} current={tok}/>,children:[
      {path:"",element:<Protectedroute><Home /></Protectedroute>},
      {path:"home",element:<Protectedroute><Home /></Protectedroute>},
      {path:"movies",element:<Protectedroute><Movie /></Protectedroute>},
      {path:"tv",element:<Protectedroute><TV /></Protectedroute>},
      {path:"moviedetails",element:<Protectedroute><MovieDetails /></Protectedroute>,children:[
        {path:":media",children:[
          {path:":id"}
        ]}
      ]},
      {path:"profile",element:<Protectedroute><Profile current={tok} /></Protectedroute>},
      {path:"register",element:<Register/>},
      {path:"login",element:<Login  use={getlogged}/>},
      {path:"*",element:<NotFound />},
    ]}
  ])
// to protected route 

function Protectedroute(props){
  if(localStorage.getItem("tkn") == null ){
    return <Navigate to="/login"/>

  }else{
    return <>
    {props.children}

    </>

  }
}

// function update data from token
function getlogged(){
  if(localStorage.getItem("tkn") !== null){

let tokn = localStorage.getItem("tkn");
let userdate = jwtDecode(tokn);
    setTok( userdate);

  }
}

// fnction to remove data from localstorege
function RemoveData(){
  localStorage.removeItem("tkn");
  setTok(null)
  
  
}

//function to solve reolading problem
function reload(){
  if(localStorage.getItem("tkn") !== null && tok === null){
    getlogged();
    <Navigate to="/home"/>
  }
}

useEffect(() => {
reload()
}, [])


  return <>
  <Offline>
    <div className='w-75 ' style={{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
   <Lottie
   style={{height:"500px"}}
animationData={offlineAnimation}   >

   </Lottie>

   <div className='bg-danger border border-4 p-3' style={{position:"fixed",bottom:"0",left:"130spx"}}>
   <h1>opps your internet has been lost</h1>

   </div>
    </div>
  </Offline>
 <RouterProvider router={router}/>
 <h5 className="text-center mt-3">
        &copy; 2024 Ahmed El Rooby. All Rights Reserved.
      </h5>


  </>
}


