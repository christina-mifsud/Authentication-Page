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

  // subscribes/connects to the API - when user logs out at any point in the app (therefore the authorization will be changing) the the currentUser will be updated
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const value = { currentUser, setCurrentUser };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
