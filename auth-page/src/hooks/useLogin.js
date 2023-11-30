import { useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export function useLogin() {
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCurrentUser } = useAuth();

  // functions
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      if (!response.user) {
        throw new Error("Something went wrong!");
      }
      setCurrentUser(response.user);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw new Error("Error logging out");
    }
  };

  // return
  return { login, isLoading, error };
}
