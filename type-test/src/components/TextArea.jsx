import React from 'react'
import { useRef , useState} from 'react'
import '../App.css'
import { useEffect} from 'react'
import axios from 'axios';
import ResultOverlay from './ResultOverlay';
import {Link} from 'react-router-dom'
import { useAuth } from './auth/AuthContext';


//will not get refreshed every time hence global
const incorr = []
//for graph report
export const speed_array = []
export const acc_array = []
//metrics
export let wpm = 0;
export let curr_accur = 0;

const TextArea = () => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [keyboard, showKeyboard] = useState(false)
  const [isLast, setLast] = useState(false)

  //auth
  const {user} = useAuth()

  //result overlay
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const handleOverlay = () => {
  setIsOverlayOpen(true)
  }


  const [inp, setinp] = useState('')
  const startTimeRef = useRef(0)

  const trigger_timer = (val) =>{
    if(!inp && val.length > 0){
      console.log("The first letter has been typed. START TIMER.")
      setSeconds(1);
      startTimeRef.current = performance.now()
    }

    setinp(val)
  }

  useEffect(() => {
    // Check if inp is not empty and seconds is greater than 0 before starting the interval
    if (inp && seconds > 0 && !isLast) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
        const el_time = (performance.now() - startTimeRef.current) / 1000 
        const speed = Math.ceil(( wordCount / el_time) * 60)
        console.log("time:", seconds, "speed:", speed)
        speed_array.push(speed)
        console.log(speed_array)
      }, 1000);

      // Save the interval ID to state
      setIntervalId(id);

      // Cleanup the interval when the component unmounts
      return () => clearInterval(id);
    }
  }, [inp, seconds, isLast]); 

  

  //added word_count endpoint in server address
  const fetchData = (total_words, diff) => {
    axios.get(`http://127.0.0.1:8080/api/data/${total_words}/${diff}`)
      .then((response) => {
        setData(response.data);
        // setCounter(response.data.length); // Set counter based on the length of the fetched data
        console.log("Data refreshed");
      })
      .catch((error) => {
        console.error(error);
      });
      //reset progress
      setInput('');
      setIndex(0);
  };

  // Fetch data when the component mounts
  useEffect(() => {fetchData(10, 5);}, []);

 const [input , setInput] = useState('') //im using this for the timer as well
 const [activeIndex , setIndex] = useState(0)
//calculating individual characters

const curr_Accuracy = () => {
  const overallAccuracy = (counter * 100) / data.length;
  console.log(overallAccuracy);
};

const incrementCounter = () => {
  setCounter(counter + 1);
  console.log("counter"+counter)
};


const sendRequest = async (endpoint, method, data) => {
  try {
    console.log(`Sending ${method} request to ${endpoint}`);
    
    const response = await axios({
      method: method,
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      data: data,
    });

    console.log('Response:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error during request:', error);
    throw error;
  }
};


const [startTime, setStartTime] = useState(0);
//replaced Date.now() to performance.now()
function proc_input(value) {
  if(activeIndex === 0){
    setStartTime(performance.now());
  }
 
  if (value.endsWith(' ')) {
    console.log('Input Value:', value); 
    const wordsEntered = 1;
    setWordCount(previousWordCount => previousWordCount + wordsEntered);
    //overlay rendering function call condition 
    
    if (activeIndex === data.length -1) {
      //forgot about this case 
      if(value.trim() === data[activeIndex]){
        incrementCounter();
      }
      
      console.log("You've reached the last word!");
      setLast(true)
      
      //time calculation here 

      const endTime = performance.now();
      console.log("wordcount in proc func: ",wordCount)
      const elapsedTime = (endTime - startTime) / 1000; // Convert milliseconds to seconds

      // Corrected WPM calculation: divide words by elapsed time and multiply by 60
      const tempwpm = (wordCount / elapsedTime) * 60; 
      wpm = Math.ceil(tempwpm);
      console.log("typing speed: ", wpm)

      curr_accur = (counter * 100) / data.length;

      //HTTP POST request to send speed data
      const update_speed = async () => {
        const speedData = {
          wpm: wpm,
          email: user?.email,
        }
      sendRequest('http://127.0.0.1:8080/api/new_speed', 'post', speedData)
        .then(data => {
          console.log('Response:', data)
        })
        .catch(error => {
          console.error('Error during request:', error)
        })
      }

      //HTTP POST request to send accuracy data
      const update_accuracy = async () => {
        const accuracyData = {
          accur: (counter * 100) / data.length,
          user: user?.email,
        };
      sendRequest('http://127.0.0.1:8080/api/new_accuracy', 'post', accuracyData)
        .then(data => {
          // Handle the response data if needed
          console.log('Response:', data);
        })
        .catch(error => {
          // Handle errors
          console.error('Error during request:', error);
        });
      }
        //open session result overlay and update speed, accuracy data
        handleOverlay();
        //update the database only if the user is logged in ofc
        if(user){
          update_speed();
          update_accuracy();
        }
        
    }else if(value.trim() === data[activeIndex] && value.trim() != " ") {
      console.log("equal");
      incrementCounter();
      curr_Accuracy();
      setIndex(index => index + 1);
      setInput('');
    } else {
      console.log("wrong");
      // incrementCounter();
      incorr.push(activeIndex);
      console.log(incorr)
      curr_Accuracy();
      setIndex(index => index + 1);
      setInput('');
    }
  } else {
    setInput(value);
  }
}

//color formatting of words according to word typed
//bug to be fixed
function getWordClass(index) {
  if (index === activeIndex) {
    return 'text-white'; // Highlight the active word
  }
  else if(index < activeIndex) {
    if(incorr.includes(index)){
      return 'text-orange'
    }
    else{
      return 'text-green text-bold'; // Highlight correctly typed words
    }
  } 
  else if(index > activeIndex){ //if the word hasnt been attempted yet 
    return 'text-gray-dark';
  }
}

//front end
  return (
<>
{isOverlayOpen && <ResultOverlay></ResultOverlay>}
  <div className='h-[200vh] w-screen'>
  <div className='h-[85vh] w-screen'>
    <div className='flex h-[6vh] w-screen mt-[10vh] justify-center'>
      <button className='font-roboto text-white hover:text-orange text-xl p-2 hover:text-2xl ease-in-out duration-300' onClick={() => fetchData(10, 5)}>10</button>
      <button className='font-roboto text-white hover:text-orange text-xl p-2 hover:text-2xl ease-in-out duration-300' onClick={() => fetchData(50, 5)}>50</button>
      <button className='font-roboto text-white hover:text-orange text-xl p-2 hover:text-2xl ease-in-out duration-300' onClick={() => fetchData(100, 5)}>100</button>
      <button className='font-roboto text-white hover:text-orange text-xl p-2 hover:text-2xl ease-in-out duration-300' onClick={() => fetchData(150, 5)}>150</button>    </div>
    <div className='flex w-screen grid grid-rows-5 h-fit'>
        <div className=' 
        p-5 min-h-[5vh] max-h-[70vh] min-w-[40vw] mx-auto max-w-[45vw] bg-[#c084fc] rounded-xl w-fit self-center text-white font-roboto text-[20px]
        transition ease-in-out duration-500'>
          {/* grid system to incorporate both the text area and the typing area inside the box */}
          <div className='flex grid grid-rows-2'>
          
            {/* main content */}
            <div className='grid-item p-2 text-center'>
              {data.map((word, index) => (
                <span key={index}>
                  {index > 0 && ' '} {/* Add a space between words */}
                  <span className={getWordClass(index)}>
                    {word}
                  </span>
                </span>
              ))}
            </div>

          <div className='grid-item h-fit p-2 mt-5'>
              {/*typing box*/}
            <div className='flex justify-center'>
              <div className='flex w-fit h-fit rounded-xl self-center text-white font-roboto text-xl'>
                <input autoFocus type="text" 
                        value={input} 
                        onChange={(e) => {proc_input(e.target.value)
                                          trigger_timer(e.target.value)}} 
                        className='text-black border-none p-2 bg-[#c084fc] self-center bg-white rounded-xl'/>
              </div>
            </div>
          </div>
          
          
          </div>
          
        </div>
        {/* KEYBOARD LAYOUT */}
        {keyboard && (
        <div className='flex h-[35vh] w-screen justify-center ease-in-out duration-500'>
          <div className='flex h-[25vh] w-[25vw] bg-white rounded-2xl'>

          </div>      
        </div>
        )}
        

    </div>   
</div>

  <div className='ease-in-out border-white border-2 
  shadow-[0px_0px_90px_2px_#d6bcfa] duration-500 
  w-[50vw] 
  ml-[25vw] 
  h-[94vh] 
  backdrop-blur-3xl z-100
  hover:translate-y-[-92vh] bg-transparent
  p-[20px] 
  rounded-[35px]'>
    <span className='flex h-[10vh] w-full justify-center font-roboto text-white text-2xl top-0'>MODES</span>
    <div className='row flex-col h-[70vh] w-full rows-2 justify-center'>
      <div className='columns-3 w-full gap-8 justify-center font-roboto text-black text-xl'>
        <button className='mb-6 bg-white h-[20vh] w-full rounded-[25px] bg-pink'></button>
        <button className='mb-6 bg-white h-[50vh] w-full rounded-[25px] bg-yellow'></button>
        <button className='mb-6 bg-white h-[35vh] w-full rounded-[25px] bg-orange'></button> 
        <button className='mb-6 bg-white h-[35vh] w-full rounded-[25px] bg-blue'></button>
        <button className='mb-6 bg-white h-[50vh] w-full rounded-[25px] bg-green'></button>
        <button className='mb-6 bg-white h-[20vh] w-full rounded-[25px] bg-white'><Link to="/JET">JET</Link></button>     
      </div>
      
    </div>

  </div>
</div>
</>
  )
}

export default TextArea 