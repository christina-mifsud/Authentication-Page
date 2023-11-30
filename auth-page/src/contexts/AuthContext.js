import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useLogin } from "../hooks/useLogin";

const AuthContext = React.createContext();

// useAuth Hook - person requesting access to AuthProvider (manager) instead of directly managing the authentication state (going directly for access)
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider Component - manager of access - keeping track of who has access/is logged in etc through useAuth Hook.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, useLogin, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
