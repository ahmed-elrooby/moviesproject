// import axios from 'axios';
import Joi from 'joi';
import Lottie from 'lottie-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import registeranimation from "../images/register.json"
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [apimessage, setApimessage] = useState("");
  const [error, setError] = useState(null)
const [user, setUser] = useState({
  name: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
})

//onchange ==> when he write get data and make it inside variable  === syntax of events in react js write as camel case

// function to get data from input that user write 
//first function
function getUser(e)
{
  let elemnetValue = e.target.value

  let newUser = {...user}
  let elementName = e.target.id;
  newUser[elementName] = elemnetValue;
  setUser(newUser)
  // console.log(newUser);
}






//third function to call api



// second function  to make validation

function submitUser(e){
e.preventDefault();


const schema = Joi.object({
  name:Joi.string().min(3).max(10).required(),
  email:Joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).required(),
  password:Joi.string().pattern(/^[a-zA-Z0-9]{3,9}$/).required(),
  rePassword: Joi.string().valid(Joi.ref('password')).required(),
  phone:Joi.string().pattern(/^01[0125][0-9]{8}$/).required()
})
const joiresponse = schema.validate(user,{abortEarly:false});
if(joiresponse.error === undefined){
  sendUser();
  //call api
}
else{
  setError(joiresponse.error.details)
}
}

async function sendUser() {
  try {
    let { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", user);
    console.log(data.message);
    if (data.message === "success") {
      navigate("/login");
    } else {
      setApimessage(data.message)
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Handle the error appropriately, such as displaying an error message to the user
  }
}



//make validation


  return <>
  <div className="container">
    <div className="row align-items-center">

      <div className="col-md-8">
      <div className="w-100 m-auto py-3">

      {
      (error == null? "":error.map((err,id)=><div key={id} className='alert alert-danger'>{err.message}</div> ))
      }
      {apimessage.length === 0? "": <div className='alert alert-danger'>{apimessage}</div> }


  


    <h3 className='mb-3'>Registeration Form</h3>
    <form action="" onSubmit={submitUser} >

        <label htmlFor="name">name</label>
        <input onChange={getUser}  className='form-control mb-3' type="text" id="name" placeholder='full_name' />
        
        <label htmlFor="email">email</label>
        <input onChange={getUser}  className='form-control mb-3' type="email" id="email" placeholder='you@example.com' />

 
   
        <label htmlFor="password">password</label>
        <input  onChange={getUser} className='form-control mb-3' type="password" id="password" placeholder='password' />


 
        <label htmlFor="rePassword">confirm password</label>
        <input  onChange={getUser} className='form-control mb-3' type="password" id="rePassword" placeholder='confirm password' />

        <label htmlFor="phone">phone</label>
        <input  onChange={getUser} className='form-control mb-3' type="tel" id="phone" placeholder='enter phone' />

        <button className='btn btn-outline-info'>Register</button>

    </form>
  </div>
      </div>
      <div className="col-md-4">
<div className="lottie">
  <Lottie animationData={registeranimation}>

  </Lottie>
</div>
      </div>
    </div>
  </div>

  </>
}

export default Register
