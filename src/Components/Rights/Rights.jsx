import React from 'react'
import { motion } from 'framer-motion';

function Rights() {
  return <>
   <motion.h4
               initial={{scale:0.1}}
               transition={{
                 duration:0.4,
                 type:"keyframes",
                 stiffness:100,
                 mass:0.5,
               }}
               whileInView={
                 {
                   scale:1
                 }
               }

 
 className="mt-5 text-center   ">
        &copy; 2024 Ahmed El Rooby. All Rights Reserved.
      </motion.h4>
  </>
}

export default Rights
