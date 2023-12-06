import { useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

// authentication is now handled here in the hook and Signup component focuses on rendering and UI interactions.

export function useSignup() {
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCurrentUser } = useAuth();

  // functions
  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!response) {
        throw new Error("Something went wrong!");
      }
      setCurrentUser(response.user);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  // return
  return { signup, isLoading, error };
}
