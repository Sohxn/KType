import React from 'react'
import { useRef , useState} from 'react'
import '../App.css'
import { useEffect} from 'react'
import axios from 'axios';
import { Input } from 'postcss';

const TextArea = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')  // Assuming the React app is hosted on the same server as Flask
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
    <div className='flex w-screen h-fit justify-center mt-[23vh] rows-2 grid grid-rows-2'>
        <div className='flex h-[40vh] max-w-[50vw] min-h-[35vh] min-w-[50vw] border-2 rounded-xl border-white self-center text-white p-5 font-roboto text-2xl'>
        <p>{data.map((word, index) => {
          if (index === activeIndex) {
            return <b className='text-gray-600'>{word}&nbsp;</b>;
          }
          return <div>{word}&nbsp;</div>;
        })}</p> 
        </div>

        <div className='flex w-fit w-[30vw] h-fit rounded-xl border-white self-center text-white p-5 font-roboto text-2xl mb-auto mt-5'>
         <input type="text" 
                value={input} 
                onChange={(e) => proc_input(e.target.value)} 
                className='text-white bg-transparent border-2 rounded-xl border-white self-center'/>
        </div>

    </div>
  )
}

export default TextArea 