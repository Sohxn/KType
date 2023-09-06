import React from 'react'
import { useRef , useState} from 'react'
import '../App.css'
import { useEffect} from 'react'
import axios from 'axios';
import { Input } from 'postcss';

const TextArea = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8080/api/data')  // Assuming the React app is hosted on the same server as Flask
      .then((response) => {
        setData(response.data);
        console.log("hi");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);



  //word input

   //initial index of the highlighted word is 0 
   //whenever user presses space , index jumps to the next word
  const [input , setInput] = useState('')
  const [activeIndex , setIndex] = useState(0)

  function proc_input(value)
  {
    if(value.endsWith(' '))
    {
      setIndex(index => index + 1)
      setInput('')
    }
    else
    {
      setInput(value)
    }
  }

  



  return (
    <div className='flex w-screen h-fit justify-center mt-[30vh] rows-2 grid grid-rows-2'>
        <div className='flex h-fit min-h-[10vh] min-w-[40vw] max-w-[45vw] border-2 rounded-xl w-fit border-white self-center text-white p-5 font-roboto text-2xl'>
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

        <div className='flex justify-center'>
          <div className='flex w-fit h-fit rounded-xl border-white self-center text-white font-roboto text-2xl'>
            <input autoFocus type="text" 
                    value={input} 
                    onChange={(e) => proc_input(e.target.value)} 
                    className='text-white bg-transparent border-2 rounded-xl border-white self-center focus:border-white'/>
          </div>

          <button id='refreshText' className='border-2 rounded-xl h-[4.5vh] w-[6vw] ml-[10vw] self-center w-fit p-2'><h className='font-roboto text-purple-400'>Refresh</h></button>
        </div>

    </div>
  )
}

export default TextArea 