import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
// import { useAuth } from "../contexts/AuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";

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

          {/* Forgotten password page - CONT HERE */}
        </Card.Body>
      </Card>
    </div>
  );
}
