import Lottie from 'lottie-react'
import React from 'react'
import notfound from "../images/404.json"
function NotFound() {
  return (
    <div>
      <Lottie 
      style={{height:"500px"}}
      animationData={notfound}></Lottie>
        
    
    </div>
  )
}

export default NotFound
