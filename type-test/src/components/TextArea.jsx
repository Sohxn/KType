import React from 'react'
import { useRef , useState} from 'react'
import '../App.css'
import { useEffect} from 'react'
import axios from 'axios';

const getText = () => `No, the random sentences in our generator
are not computer generated. We considered using computer generated 
sentences when building this tool, but found the results to be 
disappointing. Even though it took a lot of time, all the 
sentences in this generator were created by us.`.split(" ")

  
 


const TextArea = () => {
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')  // Assuming the React app is hosted on the same server as Flask
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const text = useRef(getText())

  const [activeIndex , setIndex] = useState(0) //initial index of the word

  return (
    <div className='flex w-screen h-fit justify-center mt-[23vh] rows-2 grid grid-rows-2'>
        <div className='flex w-fit max-w-[30vw] h-fit  border-2 rounded-xl border-white self-center text-white p-5 font-roboto text-2xl'>
        {text.current.map((word , index) => 
          {
                if(index === activeIndex)
                {
                  return <b className='text-black'>{word}</b>
                }
              
                return <div>{word}</div>
          }
        )}  
        </div>

        <div className='flex w-fit w-[30vw] h-fit border-2 rounded-xl border-white self-center text-white p-5 font-roboto text-2xl mb-auto mt-5'>
          
        </div>

    </div>
  )
}

export default TextArea 