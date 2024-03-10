import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'
import axios from 'axios'

const ResultOverlay = (children) => {
  
    const [isOpen , setOpen] = useState(false)
    
    //functions to open and close the session result overlay
    const overlayopen = () => {
        setOpen(true)
    }

    const overlayclose = () => {
        setOpen(false)
    }


    //this is for the accuracy
    const [currentSpeed, setCurrentSpeed] = useState(0);
    //for number animation
    const [targetSpeed, setTargetSpeed] = useState(0);
    const animationDuration = 450
    //this is the speed in wpm
    const [sessioncurrentSpeed, setsessionCurrentSpeed] = useState(0);
    
  
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

    const fetchspeed = () => {
      axios.get('http://127.0.0.1:8080/api/get_words_per_min')
        .then((response) => {
          setsessionCurrentSpeed(response.data.words_per_min);
          console.log(response.data.words_per_min);
          console.log("Data refreshed");
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
  
  
    useEffect(() => {
      fetchData();
      fetchspeed();
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
    <div className='fixed backdrop-blur-3xl font-roboto bg-transparent top-0 left-0 w-full h-full z-50 in-ease-out duration-300 bg-black ease-in-out'>
        <span className='flex text-white p-5'>press &nbsp; <span className='border-2 rounded-lg text-center'>&nbsp; ctrl + R &nbsp;</span> &nbsp;to type again</span>
        <div className='grid grid-cols-3 text-center mt-20 text-2xl text-white'>
            <div className='col-span-1'>speed:</div>  
            <div className='col-span-2'>accuracy:</div>
        </div>
    </div>
  )
}

export default ResultOverlay