import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'; 
// import {themes} from './themes.js'

const Dash = () => {

  const [rankOpen, setrankOpen] = useState(false)

  const [currentSpeed, setCurrentSpeed] = useState(0);
  // const targetSpeed = 0 //say
  const [targetSpeed, setTargetSpeed] = useState(0);
  const animationDuration = 450

  const fetchData = () => {
    axios.get('http://127.0.0.1:8080/api/get_accuracy')
      .then((response) => {
        setTargetSpeed(response.data.accurracy);
        console.log(response.data.accurracy);
        console.log("Data refreshed");
      })
      .catch((error) => {
        console.error(error);
      });
  };



  useEffect(() => {
    fetchData();
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min(1, (timestamp - startTime) / animationDuration);

      setCurrentSpeed(Math.floor(progress * targetSpeed));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animate);
  }, [targetSpeed, animationDuration]);
  
  const openRanks = () =>
  {
    setrankOpen(!rankOpen)
  }

  return (
   <>
    <div className='flex h-screen w-screen justify-center'>
      {/* div with imaginary border that was pre calculated lmao */}
      <div className='w-[60vw] h-[75vh] m-[10vw] mt-[15vh] rounded-3xl'>
        {/*Masonry layout*/}
        <div className="grid grid-cols-3 gap-10 p-4"  style={{ gridTemplateRows: 'auto auto' }}>
          <div className="grid-item flex items-center border-2 h-[35vh] rounded-[35px] text-white bg-purple-400 border-purple-400 justify-center">
            <span className='text-[10vh] font-roboto'>
              {currentSpeed}<span className='text-[5vh]'> wpm</span>
            </span>
          </div>
          <div className="grid-item h-[35vh] rounded-[35px] gap-8 text-white" style={{ display: 'grid', gridTemplateRows: '1fr 1fr' }}>
            <div className='row-item flex border-2 rounded-[35px] border-[#e9d5ff] bg-[#e9d5ff] justify-center items-center'>
              <span className='font-roboto text-[3vh] text-black'>Accuracy</span></div>
            <div className='row-item border-2 rounded-[35px] border-[#B3B7EE] bg-[#B3B7EE]'></div>
          </div>

          <div className="grid-item border-2 row-span-2 rounded-[35px] text-white border-white bg-white">
            
          </div>
          <div className="grid-item flex justify-center items-center border-4 h-[30vh] col-span-2 rounded-[35px] text-white border-[#f5d0fe]">
             <span className='font-roboto text-[5vh] m-4'>streak will be here</span>
          </div>
        </div>
      </div>
    </div>
   </>
  )
}

export default Dash