import React from 'react'
import { useRef , useState} from 'react'
import '../App.css'
import { useEffect} from 'react'
import axios from 'axios';



const TextArea = () => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);

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

  // You can call this function to refresh the data
  const refresh = () => {
    fetchData();
  };
  //word input

   //initial index of the highlighted word is 0 
   //whenever user presses space , index jumps to the next word
  const [input , setInput] = useState('')
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

function proc_input(value) {
  if (value.endsWith(' ')) {
    if (activeIndex === data.length) {
      console.log("You've reached the last word!");
      // Handle the case when the last word is entered
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
      curr_Accuracy();setIndex(index => index + 1);
      setInput('');
    } else {
      console.log("wrong");
      incrementCounter();
      curr_Accuracy();
      setIndex(index => index + 1);
      setInput('');
    }
  } else {
    setInput(value);
  }
}

  



  return (
    <div className='flex w-screen h-fit p-40 grid grid-rows-4'>

        <div className='flex h-fit pb-20 min-h-[7vh] min-w-[40vw] mx-auto max-w-[45vw] border-2 rounded-xl w-fit border-white self-center text-white p-5 font-roboto text-2xl'>
          <div className='h-fit p-4'>
          
              <p className='break-all'>{data.map((word, index) => {
                if (index === activeIndex) {
                  return <b className='text-purple-400'>{word}&nbsp;</b>
                }
                else if (index < activeIndex){  
                      return <span className='text-green-300 text-bold'>{word}&nbsp;</span>
                    }
                return (
                  <> 
                    <span>{word}&nbsp;</span>
                  </>
                )
              })}</p> 
          
          </div>
        </div>

        <div className='flex justify-center'>
          <div className='flex w-fit h-fit rounded-xl border-white self-center text-white font-roboto text-2xl'>
            <input autoFocus type="text" 
                    value={input} 
                    onChange={(e) => proc_input(e.target.value)} 
                    className='text-white bg-transparent border-2 rounded-xl border-white self-center focus:border-white'/>
          </div>

          <button id='refreshText' onClick={refresh} className='border-2 rounded-xl h-[4.5vh] w-[6vw] ml-[10vw] self-center p-2'>
            <h className='font-roboto text-purple-400'>Refresh</h></button>
        </div>
          
        <div className='flex mx-auto font-roboto text-white'>
            KEYBOARD LAYOUT
        </div>
  
    </div>
  )
}

export default TextArea 