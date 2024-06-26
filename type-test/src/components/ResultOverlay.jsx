import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'
import { wpm } from './TextArea';
import { curr_accur } from './TextArea';

const ResultOverlay = (children) => {
  
    const [isOpen , setOpen] = useState(false);


    //this is for the accuracy
    const [currentSpeed, setCurrentSpeed] = useState(0);
    //for number animation
    const [targetSpeed, setTargetSpeed] = useState(0);
    const animationDuration = 450
    //this is the speed in wpm
    const [sessioncurrentSpeed, setsessionCurrentSpeed] = useState(0);
    // console.log("res"+wpm);
  
    const fetchData = () => {
      setTargetSpeed(curr_accur);
      console.log(curr_accur);
      console.log("fetched")
    };

    const fetchspeed = () => {
      setsessionCurrentSpeed(wpm);
      console.log(wpm);
    };

    useEffect(() => {
      fetchData();
      fetchspeed();
  }, []);
  
    useEffect(() => {
      
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

  return (
    <div className='fixed backdrop-blur-2xl 
    font-roboto top-0 left-0 w-full h-full z-20 
    duration-500 ease-in-out'>
        <span className='flex text-white justify-center p-5'>press&nbsp;<span className='border-2 rounded-lg text-center'>&nbsp; ctrl + R &nbsp;</span>&nbsp;to type again</span>
        <div className='flex p-20 grid grid-cols-2 mt-20 text-2xl text-white
                        m-5'>
            <div className='text-left'>speed: {sessioncurrentSpeed}</div>  
            <div className='text-right'>accuracy: {targetSpeed}</div>
        </div>
    </div>
  )
}

export default ResultOverlay


