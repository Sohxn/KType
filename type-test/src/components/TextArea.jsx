import React from 'react'
import { useRef , useState} from 'react'
import '../App.css'
import { useEffect} from 'react'
import axios from 'axios';
const incorr = []

const TextArea = () => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const wordsPerMinute = (wordsEntered, totalSeconds) => wordsEntered / (totalSeconds / 60);

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

  const fetchData = () => {
    axios.get('http://127.0.0.1:8080/api/data')
      .then((response) => {
        setData(response.data);
        setCounter(response.data.length); // Set counter based on the length of the fetched data
        console.log("Data refreshed");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

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


function proc_input(value) {
  if (value.endsWith(' ')) {
    console.log('Input Value:', value); 
    const wordsEntered = value.trim().length;
    console.log(wordsEntered);
    setWordCount(previousWordCount => previousWordCount + wordsEntered);
    if (activeIndex === data.length) {
      console.log("You've reached the last word!");
      // Handle the case when the last word is entered
      stopTimer();
      const wpm = wordsPerMinute(wordCount, seconds);
      console.log('Words per minute:', wpm);
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

//use this to refresh the data
const refresh = () => {
  fetchData();
  setInput('');
  setIndex(0); //will reset the highlighted word when refresh is pressed
};


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
    return 'text-purple-400';
  }
}


  
//front end
  return (
    <div className='flex w-screen h-fit p-40 grid grid-rows-4'>

        <div className='flex p-5 min-h-[7vh] min-w-[40vw] mx-auto max-w-[45vw] border-2 rounded-xl w-fit border-white self-center text-white font-roboto text-2xl'>
          {/* grid system to incorporate both the text area and the typing area inside the box */}
          <div className='flex h-fit p-4 grid grid-rows-2'>
          
          {/* main content */}
          <div className='grid-item h-fit p-2'>
            {data.map((word, index) => (
              <span key={index}>
                {index > 0 && ' '} {/* Add a space between words */}
                <span className={getWordClass(index)}>
                  {word}
                </span>
              </span>
            ))}
          </div>

          <div className='grid-item h-fit p-2 mt-10'>
              {/*typing box*/}
            <div className='flex justify-center'>
              <div className='flex w-fit h-fit rounded-xl border-white self-center text-white font-roboto text-2xl'>
                <input autoFocus type="text" 
                        value={input} 
                        onChange={(e) => {proc_input(e.target.value)
                                          trigger_timer(e.target.value)}} 
                        className='text-white bg-transparent border-2 rounded-xl border-white self-center focus:border-white'/>
              </div>

              <button id='refreshText' onClick={refresh} className='border-2 text-[2vh] rounded-xl h-[4.5vh] w-[6vw] ml-[10vw] self-center'>
                <h className='font-roboto text-purple-400'>Refresh</h>
              </button>
            </div>
          </div>
          
          </div>
        </div>
    </div>
  )
}

export default TextArea 