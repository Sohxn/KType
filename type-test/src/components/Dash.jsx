import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'; 
import { useAuth } from './auth/AuthContext'
import {motion} from "framer-motion"

const Dash = () => {
  
  const {user} = useAuth()
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [targetSpeed, setTargetSpeed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [curr_accuracy, setCurrAccuracy] = useState(0)
  const duration = 500


  const usermail = user? user.email : ''
 



  //custom endpoint for recieving average users  tats
  const fetchData = (usr) => {
    axios.get(`http://127.0.0.1:8080/api/stats/${usr}`)
      .then((response) => {
        console.log("DASH.JSX")
        console.log("speed:",response.data['speed'])
        console.log("accuracy: ", response.data['accuracy'])
        setTargetSpeed(response.data['speed'])
        setAccuracy(response.data['accuracy'])
      })
      .catch((error) => {
        console.error("ERROR",error);
      });
  };

   



  useEffect(() => {
    
    if(user){
      console.log("Fetching data using fetchData fx")
      fetchData(usermail);
      console.log("fx called.")
    }

    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(1, (timestamp - startTime) / duration)
      
      if(targetSpeed !== undefined && accuracy !== undefined){
        setCurrentSpeed(Math.floor(progress * targetSpeed));
        setCurrAccuracy(Math.floor(progress * accuracy));
      }
      console.log(currentSpeed)
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animate);
  }, [targetSpeed, duration, usermail]);
  


  return (
   <>
    <div className='flex h-screen w-screen justify-center ease-in-out duration-500 transition-all'>
      {/* div with imaginary border that was pre calculated lmao */}

      <div
      initial ={{y: 200}}
      animate ={{y: 0}}
      ease={{duration: 0.2}}
      className='w-[60vw] h-[75vh] m-[10vw] mt-[15vh] rounded-3xl'>
        {/*Masonry layout*/}
        <div className="grid grid-cols-3 gap-10 p-4"  style={{ gridTemplateRows: 'auto auto' }}>
          
          <motion.div
          initial ={{y: 200}}
          animate ={{y: 0}}
          ease={{duration: 0.7}} 
          className="grid-item flex items-center border-2 h-[35vh] rounded-[35px] text-white bg-purple-400 border-purple-400 justify-center">
            <span className='text-[9vh] font-roboto'>
            {currentSpeed}<span className='text-[3vh]'> wpm</span>
            </span>
          </motion.div>

          <div className="grid-item h-[35vh] rounded-[35px] gap-8 text-white" style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}>
            
            <motion.div
            initial ={{y: 200}}
            animate ={{y: 0}}
            ease={{duration: 0.1}} 
            className='row-item flex border-2 rounded-[35px] border-[#e9d5ff] bg-[#e9d5ff] justify-center items-center'>
              <span className='font-roboto text-[4vh] text-black'>{curr_accuracy}%</span>
              <span className='text-black text-xl font-roboto mt-3'>&nbsp;accuracy</span>
            </motion.div>
            
            <motion.div 
            initial ={{y: 200}}
            animate ={{y: 0}}
            ease={{duration: 0.7}}
            className='flex justify-center items-center border-2 rounded-[35px] border-[#B3B7EE] bg-[#B3B7EE] justify-center '>
              <span className='font-roboto text-black text-3xl text-center'>100%</span>
            </motion.div>
          
          </div>

          <motion.div 
          initial ={{y: 200}}
          animate ={{y: 0}}
          ease={{duration: 1}}
          className="grid-item border-2 row-span-2 rounded-[35px] text-white border-white bg-white ">
            <div className='flex grid grid-rows-2 text-center justify-center font-roboto text-3xl text-black'>
              <span className='pt-5'>Modes</span>
              <div className='m-3'>
                
              </div>
            </div>
          </motion.div>

          {/* line graph */}
          <motion.div
          initial ={{y: 200}}
          animate ={{y: 0}}
          ease={{duration: 3}}
          className="grid-item flex border-2 h-[30vh] 
          col-span-2 rounded-[35px] text-white border-[#f5d0fe]
          grid grid-cols-8">
              <div className='col-span-7'>
                {/* chart itself */} 
              </div>

              <div className='flex grid justify-center items-center grid-rows-2'>
                {/* tabs */}
                  <button className='rotate-[-90deg] font-roboto text-sm border-2 h-fit w-fit rounded-[20px]
                  p-2'>this session</button>
                  <button className='rotate-[-90deg] font-roboto text-sm border-2 h-fit w-fit rounded-[20px]
                  p-2'>all sessions</button>
              </div>
          </motion.div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Dash