import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged} from 'firebase/auth';
import { auth } from '../firebase-config'; // Adjust the path as necessary
import axios from 'axios'; //if i need it later
import { Navigate } from 'react-router-dom';


const AuthContext = createContext()

export function AuthProvider({children}) {
  const [user, setUser] = useState(null); // Changed from {} to null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );

 
}

//this will be used everywhere
export const useAuth = () => {
  return useContext(AuthContext);
}

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-screen w-screen bg-black flex justify-center text-center ease-in-out duration-500">
      Loading...
      </div>;
  }

  return user ? children : <Navigate to="/login" />;
};
