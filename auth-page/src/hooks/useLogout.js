import { useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

// authentication is now handled here in the hook and Login component focuses on rendering and UI interactions.

export function useLogout() {
  // state
  const { setCurrentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // functions
  async function logout() {
    try {
      await auth.signOut();
      setCurrentUser(null);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
      console.error("Error logging out!");
    }
  }

  // return
  return { logout, isLoading, error };
}
