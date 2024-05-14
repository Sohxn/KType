import { useState } from "react";
import axios from 'axios';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
// import "./App.css";
import { auth, googleProvider } from "./firebase-config";


function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
      new_user(user?.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      new_user(user?.email);
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
      new_user(user?.email);
    } catch (error) {
      console.log(error.message);
    }
  };


  const logout = async () => {
    await signOut(auth);
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

  const new_user = async (userEmail) => {
    // const userData = await getUserData();
    const requestData = {
      user : userEmail,
    };
    // Make an HTTP POST request using the sendRequest function with Axios
    sendRequest('http://127.0.0.1:8080/api/new_user', 'post', requestData)
      .then(data => {
        // Handle the response data if needed
        console.log('Response:', data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error during request:', error);
      });
  };

  return (
    <>
  <div className="flex h-screen w-screen bg-black justify-center items-center">
    <div className="flex h-[60vh] max-h-[80vh] grid grid-rows-5 bg-[#d8b4fe] shadow-[0px_0px_200px_10px_#d6bcfa] 
    p-5 lg:w-[20vw] md:w-[40vw] rounded-2xl justify-center items-center">
      <span className="flex font-roboto text-4xl justify-center">LOGIN</span>
      <div className="flex justify-center">
        <input
          className="bg-white rounded-md h-10 text-center"
          placeholder="Email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
      </div>
      <div className="flex justify-center">
        <input
          className="bg-white rounded-md h-10 text-center"
          placeholder="Password"
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
      </div>
      
      <button className="font-roboto border-2 border-black h-[7vh] rounded-2xl hover:bg-white ease-in-out duration-500" onClick={login}> Login</button>

       {/* <h4> User Logged In: </h4>
      {user?.email}  */}

      <button className="font-roboto border-2 border-black h-[7vh] rounded-2xl hover:bg-white ease-in-out duration-500" onClick={loginWithGoogle}> Login with Google</button>
      <button className="font-roboto border-2 border-black h-[6vh] rounded-2xl hover:bg-white ease-in-out duration-500" onClick={logout}> Sign Out </button>
      <button className="font-roboto text-black h-[6vh] pt-5 hover:text-white
      ease-in-out duration-200">Create new account / sign up</button>
    </div>
  </div>
    </>
  );
}

export default App;