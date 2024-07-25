import { useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import assert from "assert";

// authentication is now handled here in the hook and Login component focuses on rendering and UI interactions.

export function useLogin() {
  // state
  const { setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // functions
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      assert(
        response.user !== null && response.user !== undefined,
        "response.user was unexpectedly or undefined!!"
      );
      setCurrentUser(response.user);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  // return
  return { login, isLoading, error };
}

// look into the errors - use 1 system - for example either remove the 'setError(null)'
