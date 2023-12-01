////////////////////////////////////
// HELP! I keep getting "TypeError: setError is not a function at handleSubmit" OR "_firebase__WEBPACK_IMPORTED_MODULE_1__.auth.createUserWithEmailAndPassword(...) is not a function"
//////////////////////////////////

import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
// import { useAuth } from "../contexts/AuthContext";
import { useSignup } from "../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const { signup } = useAuth();
  const { signup, isLoading: isLoadingSignup } = useSignup();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    } else {
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    }
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={isLoadingSignup} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
