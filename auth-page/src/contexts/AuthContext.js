import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

// useAuth Hook - person requesting access to AuthProvider (manager) instead of directly managing the authentication state (going directly for access)
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider Component - manager of access - keeping track of who has access/is logged in etc through useAuth Hook.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // function signup(email, password) {
  //   return auth.createUserWithEmailAndPassword(email, password);
  // }

  // function login(email, password) {
  //   return auth.signInWithEmailAndPassword(email, password);
  // }

  // how do I test to see if this works?
  // async function logout() {
  //   try {
  //     await auth.signOut();
  //     setCurrentUser(null);
  //   } catch (error) {
  //     console.error("Error logging out!");
  //   }
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, setCurrentUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
