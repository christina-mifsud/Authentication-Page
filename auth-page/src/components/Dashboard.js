import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useLogout } from "../hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { logout } = useLogout();
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
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
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleSubmit}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
