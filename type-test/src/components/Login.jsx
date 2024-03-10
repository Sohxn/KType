import { useState } from "react";
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
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };


  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
  <div className="flex h-screen w-screen bg-black justify-center items-center">
    <div className="flex h-[60vh] max-h-[80vh] grid grid-rows-5 bg-[#d8b4fe] p-5 lg:w-[20vw] md:w-[40vw] rounded-2xl justify-center">
      <span className="flex font-roboto text-4xl">LOGIN</span>
      <div>
        <input
          className="bg-white rounded-md h-10 text-center"
          placeholder="Email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
      </div>
      <div>
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
      {user?.email} */}

<button className="font-roboto border-2 border-black h-[7vh] rounded-2xl hover:bg-white ease-in-out duration-500" onClick={loginWithGoogle}> Login with Google</button>
      <button className="font-roboto border-2 border-black h-[6vh] rounded-2xl hover:bg-white ease-in-out duration-500" onClick={logout}> Sign Out </button>
    </div>
  </div>
    </>
  );
}

export default App;