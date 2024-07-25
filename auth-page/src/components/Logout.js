import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const { logout, isLoading: isLoadingLogout } = useLogout();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out", error.message);
    }
  }

  return (
    <div className="w-100 text-center mt-2">
      <Button variant="link" onClick={handleSubmit}>
        Log Out
      </Button>
    </div>
  );
}
