import './App.css'
import Nav from './components/Nav.jsx'
import TextArea from './components/TextArea'
import React from 'react'
import { useEffect ,useState} from 'react'
import axios from 'axios';


const App = () => {

  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')  // Assuming the React app is hosted on the same server as Flask
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div className='h-screen w-screen bg-gradient-to-tr from-gray-700 via-gray-900 to-black flex '>
      <div><Nav/></div>
      <div><TextArea/></div>
      <div><h1 className='text-white'>{data.message}</h1> </div>
    </div>
  )
}


export default App
