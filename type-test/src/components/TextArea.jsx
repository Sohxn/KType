import React from 'react'
import { useRef , useState} from 'react'
import '../App.css'
import { useEffect} from 'react'
import axios from 'axios';
import ResultOverlay from './ResultOverlay';

//will not get refreshed every time hence global
const incorr = []
export let wpm = 0;
export let curr_accur = 0;
const TextArea = () => {

  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [keyboard, showKeyboard] = useState(false)

  //result overlay
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const handleOverlay = () => {
  setIsOverlayOpen(true)
  }


  //wpm
  const wordsPerMinute = (wordsEntered, totalSeconds) => wordsEntered / (totalSeconds / 60)
  //@vineet this is for the timer
  const [inp, setinp] = useState('')

  const trigger_timer = (val) =>{
    if(!inp && val.length > 0){
      console.log("The first letter has been typed. START TIMER.")
      setSeconds(1);
    }

    setinp(val)
  }
  useEffect(() => {
    // Check if inp is not empty and seconds is greater than 0 before starting the interval
    if (inp && seconds > 0) {
      const id = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);

      // Save the interval ID to state
      setIntervalId(id);

      // Cleanup the interval when the component unmounts
      return () => clearInterval(id);
    }
  }, [inp, seconds]); 
  const stopTimer = () => {
    // Clear the interval to stop the timer
    clearInterval(intervalId);
  };
  //added word_count endpoint in server address
  const fetchData = (total_words) => {
    axios.get(`http://127.0.0.1:8080/api/data/${total_words}`)
      .then((response) => {
        setData(response.data);
        setCounter(response.data.length); // Set counter based on the length of the fetched data
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
  useEffect(() => {fetchData(10);}, []);

 const [input , setInput] = useState('') //im using this for the timer as well
const [activeIndex , setIndex] = useState(0)

const curr_Accuracy = () => {
  const overallAccuracy = (counter / data.length) * 100;
  console.log(overallAccuracy);
};

const incrementCounter = () => {
  console.log(counter)
  setCounter(counter - 1);
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

//incorrect word indices list
//gets refreshed 
//have to keep content

let startTime = 0;
function proc_input(value) {
  //initialise speedHistory[]
  if (value.endsWith(' ')) {
    console.log('Input Value:', value); 
    const wordsEntered = value.trim().length;
    console.log(wordsEntered);
    setWordCount(previousWordCount => previousWordCount + wordsEntered);
    //overlay rendering function call condition 
    
    if (activeIndex === data.length -1) {
      console.log("You've reached the last word!");
      const endTime = Date.now();
      const elapsedTime = (endTime - startTime) / 1000; // Convert milliseconds to seconds

      const speed = value.length / elapsedTime;

      // speedHistory.push(speed);
      // Handle the case when the last word is entered
      stopTimer();
      wpm = wordsPerMinute(wordCount, seconds);
      console.log('Words per minute:', wpm);
      curr_accur = (counter / data.length) * 100;
      const requestData = {
        accur: (counter / data.length) * 100,
      };

      // Make an HTTP POST request using the sendRequest function with Axios
      sendRequest('http://127.0.0.1:8080/api/new_accuracy', 'post', requestData)
        .then(data => {
          // Handle the response data if needed
          console.log('Response:', data);
        })
        .catch(error => {
          // Handle errors
          console.error('Error during request:', error);
        });
        //open session result overlay
        handleOverlay();
    }else if (value.trim() === data[activeIndex]) {
      console.log("equal");
      curr_Accuracy();
      setIndex(index => index + 1);
      setInput('');
    } else {
      console.log("wrong");
      incrementCounter();
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
    return 'text-white-400'; // Highlight the active word
  }
  else if(index < activeIndex) {
    if(incorr.includes(index)){
      return 'text-red-400'
    }
    else{
      return 'text-green-300 text-bold'; // Highlight correctly typed words
    }
  } 
  else if(index > activeIndex){ //if the word hasnt been attempted yet 
    return 'text-gray-900';
  }
}



  
//front end
  return (
<>
{isOverlayOpen && <ResultOverlay></ResultOverlay>}
  <div className='h-[200vh] w-screen'>
  <div className='h-[85vh] w-screen'>
    <div className='flex h-[6vh] w-screen mt-[10vh] justify-center'>
      <button className='font-roboto text-white text-xl p-2' onClick={() => fetchData(10)}>10</button>
      <button className='font-roboto text-white text-xl p-2' onClick={() => fetchData(50)}>50</button>
      <button className='font-roboto text-white text-xl p-2' onClick={() => fetchData(100)}>100</button>
      <button className='font-roboto text-white text-xl p-2' onClick={() => fetchData(150)}>150</button>
      <button className='font-roboto text-white text-xl p-2' onClick={() => fetchData(200)}>200</button>
    </div>
    <div className='flex w-screen grid grid-rows-5 h-fit'>
        <div className='flex 
        p-5 min-h-[5vh] min-w-[40vw] mx-auto max-w-[45vw] bg-[#c084fc] rounded-xl w-fit self-center text-white font-roboto text-[20px]'>
          {/* grid system to incorporate both the text area and the typing area inside the box */}
          <div className='flex grid grid-rows-2'>
          
            {/* main content */}
            <div className='grid-item p-2'>
              {data.map((word, index) => (
                <span key={index}>
                  {index > 0 && ' '} {/* Add a space between words */}
                  <span className={getWordClass(index)}>
                    {word}
                  </span>
                </span>
              ))}
            </div>

          <div className='grid-item h-fit p-2 mt-2'>
              {/*typing box*/}
            <div className='flex justify-center'>
              <div className='flex w-fit h-fit rounded-xl border-none outline-none self-center text-white font-roboto text-2xl'>
                <input autoFocus type="text" 
                        value={input} 
                        onChange={(e) => {proc_input(e.target.value)
                                          trigger_timer(e.target.value)}} 
                        className='text-white bg-transparent self-center focus:border-white rounded-xl'/>
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

<div className='flex ease-in-out grid grid-rows-2 duration-500 w-screen h-screen hover:bg-white z-100 hover:translate-y-[-92vh] justify-center bg-gray-800 p-2 rounded-[60px]'>
  <div className='flex grid-item grid grid-cols-5 text-black font-roboto h-[3vh] w-[40vw]'>
    <button className='grid-item text-sm bg-[#b2a6b6] hover:bg-white ease-in-out duration-500 rounded-lg'>sidebar</button>
    <button className='grid-item text-sm bg-[#b2a6b6] hover:bg-white ease-in-out duration-500 rounded-lg ml-2'>option2</button>
    <button className='grid-item text-sm bg-[#c4bbc7] hover:bg-white ease-in-out duration-500 rounded-lg ml-2' onClick={() => showKeyboard(!keyboard)}>layout</button>
    <button className='grid-item text-sm bg-[#e0dbe1] hover:bg-white ease-in-out duration-500 rounded-lg ml-2'>themes (beta)</button>
    <button className='grid-item text-sm bg-white rounded-lg ml-2'>modes (beta)</button>
  </div>
  <div className='flex grid-item h-[70vh] w-[40vw] bg-[#c084fc] rounded-2xl'>

  </div>

</div>
</div>
</>
  )
}

export default TextArea 