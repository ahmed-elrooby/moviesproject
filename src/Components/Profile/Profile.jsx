import Lottie from 'lottie-react'
import React from 'react'
import prof from "./Profile.module.css"
import animateProfile from "../images/profile.json"

function Profile({current}) {
  return <>
  {
    current?  <div  className="container w-50 p-3 d-flex align-items-center justify-content-center p-4">
    <div  style={{height:"400px"}} className="card w-50 d-flex justify-content-center flex-column gap-4 align-items-center">
    <Lottie animationData={animateProfile}
    style={{height:"200px"}}
    >

    </Lottie>
    <h4 className={prof.title}>{current.name}</h4>

 
    </div>
  </div>:""
  }

  </>
}

export default Profile
