import { useState, useEffect } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {auth, googleProvider} from './firebase-config'
import { useAuth } from "./auth/AuthContext";
//animations
import {motion} from "framer-motion"


const Login = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState(""); //message to be displayed if login fails
  //switch states
  const [viewLogin, setViewLogin] = useState("true"); //initially the login page would appear 
  const [userName, setUserName] = useState("");
  const { user, setUser } = useAuth()
  const navigate = useNavigate()


   //login -> register /  register -> login
   const ToggleViewState = () =>{
    setViewLogin(!viewLogin)
    setError("")
    //clear all error messages
  }
  

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
        userName,
      );
      const user = userCredential.user
      setUser(user)
      console.log("NEW USER : ", user);
      await new_user(user?.email, userName); 
      navigate('/dashboard')
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const user = userCredential.user
      setUser(user)
      console.log(loggedInUser);
      await new_user(user?.email);
      navigate('/dashboard')
    } catch (error) {
      console.log(error.message);
      setError("Login Failed. Please check your details again.")
      setLoginEmail("");
      setLoginPassword("");
    }
  };
  
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      //username
      const userName = user.displayName;
      console.log("user:" ,user);
      console.log("username: ", userName);
      await new_user(user?.email, userName);
      setError("")
      navigate('/dashboard')
    } catch (error) {
      console.log(error.message);
      setError("Failed to fetch credentials. Please Try Again.")
    }
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

  const new_user = async (userEmail, displayName) => {
    const requestData = {
      userEmail: userEmail,
      displayName: displayName,
    };
    sendRequest('http://127.0.0.1:8080/api/new_user', 'post', requestData)
      .then(data => {
        console.log('Response:', data);
      })
      .catch(error => {
        console.error('Error during request:', error);
      });
  };

 

  // uncomment the following after routes are set up
  if (user) {
    console.log("USER LOGGED IN : ", user)
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex h-screen w-screen bg-black justify-center items-center ease-in-out duration-500">
      <motion.div 
      initial={{x: 200}}
      animate={{x: 0}} 
      className="flex h-[60vh] max-h-[80vh] grid grid-rows-2 bg-[#d8b4fe] shadow-[0px_0px_200px_10px_#d6bcfa] p-5 lg:w-[20vw] md:w-[40vw] rounded-2xl justify-center items-center">
        {/* conditional rendering of error message */}
        
        <span className="flex font-roboto text-4xl justify-center">{viewLogin ? "LOGIN" : "REGISTER"}</span>
        <div className="flex justify-center">
          {viewLogin ? <input
            className="bg-white rounded-md h-10 w-[15vw] text-center font-roboto"
            placeholder="Email"
            value={loginEmail}
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          /> : 
          <input
            className="bg-white rounded-md h-10 w-[15vw] text-center font-roboto"
            placeholder="Register Email"
            value={registerEmail}
            onChange={(event) => {
              setRegisterEmail(event.target.value)
            }}
          /> 
          }
          
        </div>
        <div className="flex justify-center">
          {viewLogin ? <input
            className="bg-white rounded-md h-10 w-[15vw] text-center font-roboto"
            type="password"
            value={loginPassword}
            placeholder="Password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          /> :
          <input 
            className="bg-white rounded-md h-10 w-[15vw] text-center font-roboto"
            type="password"
            value={registerPassword}
            placeholder="create a strong password"
            onChange={(event) => {
              setRegisterPassword(event.target.value)
            }}
          />}
        </div>

        {/* conditional username field rendering */}
        {!viewLogin && 
        <div className="flex justify-center">
          <input
            className="bg-white rounded-md h-10 w-[15vw] text-center font-roboto mt-3"
            value={userName}
            placeholder="create a username"
            onChange={(event) => {
              setUserName(event.target.value);
            }}
          />
        </div>}

        <div className="flex justify-center grid grid-rows-2 gap-2 pt-10">
          {viewLogin ?
          <button className="font-roboto transition-all ease-in-out duration-500 border-2 border-black h-[7vh] w-[15vw] rounded-2xl hover:bg-white ease-in-out duration-500" 
          onClick={login}> Login</button>
          :
          <button className="font-roboto border-2 border-black h-[7vh] w-[15vw] rounded-2xl hover:bg-white ease-in-out duration-500" 
          onClick={register}>Register</button> 
          }
          {viewLogin ?
          <button className="font-roboto border-2 border-black h-[7vh] w-[15vw] rounded-2xl hover:bg-white ease-in-out duration-500" 
          onClick={loginWithGoogle}>Login with Google</button>
          :
          <button className="font-roboto border-2 border-black h-[7vh] w-[15vw] rounded-2xl hover:bg-white ease-in-out duration-500" 
          onClick={loginWithGoogle}>Register with Google</button>
          }
        </div>
        <div>
          <button className="flex font-roboto text-black h-[6vh] justify-center pt-8 mb-10 hover:text-white ease-in-out duration-200" 
          onClick={ToggleViewState}>{viewLogin ? "Don't have an account? Register" : "Already have an account? Login"}</button>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
