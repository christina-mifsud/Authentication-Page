import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

export default function Logout() {
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
    /// what do I return in the logout component? The below card is never showing because I am not navigating to it.
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log Out</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Button disabled={isLoadingLogout} className="w-100" type="submit">
              Log Out
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
