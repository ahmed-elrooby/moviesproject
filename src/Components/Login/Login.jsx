import Joi from 'joi';
import Lottie from 'lottie-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginAnimation from "../images/Login.json"
import axios from 'axios';
const Login = () => {



const [apiMessage, setApiMessage] = useState("")
  let navigate = useNavigate();
 const [user, setUser] = useState({
  email:"",
  password:""
 })

 const [error, setError] = useState([])
  function getUser(e){
    let elementName = e.target.id;
    let elementValue = e.target.value;
    let newUser = {...user};
    newUser[elementName]=elementValue;
   setUser(newUser);
  } 


  async function sendUser(){
    const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",user)
    console.log(data);
      if(data.message === "success"){
        //call api
        navigate("/home")

        // go to home page 
      }else{
           setApiMessage(data.message)
      }
  
  }
 


function regUser(e){
  e.preventDefault();
  let schema = Joi.object({
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).required(),
    password:Joi.string().pattern(/^[a-zA-Z0-9]{3,9}$/).required()

  })
  let response = schema.validate(user,{abortEarly:false})
  if(response.error === undefined){
    sendUser();
        
  }else{
    setError(response.error.details)
  }
}


  return  <>
  <div className="container">
    {
      apiMessage.length === 0?"":<div className='alert alert-danger'>{apiMessage}</div>
    }
    <div className="row align-items-center">
      <div className="col-md-8">
         <div className="w-80 m-auto py-3">
    <h3>Login Form</h3>
    <form action="" onSubmit={regUser}>
      {error === null?"": error.map((err,idx)=><div key={idx} className='alert alert-danger'>{err.message}</div>)  }
       
        <label htmlFor="email">email</label>
        <input onChange={getUser}   className='form-control mb-3' type="email" id="email" placeholder='you@example.com' />

        <label htmlFor="password">password</label>
        <input onChange={getUser}  className='form-control mb-3' type="password" id="password" placeholder='password' />

        <button className='btn btn-outline-info'>Login</button>

    </form>
  </div>
      </div>
      <div className="col-md-4">
          <div className="lottie">
      <Lottie animationData={LoginAnimation}
    
      >

      </Lottie>
      </div>
    </div>
 


    </div>
  </div>
 
  </>
}

export default Login
