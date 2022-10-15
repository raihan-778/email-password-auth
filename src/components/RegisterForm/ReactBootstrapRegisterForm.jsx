import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);

const ReactBootstrapRegisterForm = () => {
  const [validPassword, setValidPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const handleRegister = (event) => {
    event.preventDefault();
    setSuccess(false);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setValidPassword("Please input atleast two uppercase latter");
      return;
    }
    if (!/(?:[!@#$%&]*[`!@#$%&]){2}/) {
      setValidPassword("Password must have at least two special characters");
    }
    if (!/(?=^[0-9]{2,}$)/.test(password)) {
      setValidPassword("Password must have at least two number digit");
    }
    if (!/(?=^[A-Za-z0-9]{6,}$)/.test(password)) {
      setValidPassword("Password must be 6 characters long");
      return;
    } else {
      setValidPassword("");
    }
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
        verifyEmail();
      })
      .catch((error) => {
        console.error("error:", error);
        setValidPassword(error.message);
      });
  };

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("Please verify your email !! ");
    });
  };

  return (
    <div className="w-50 mx-auto">
      <Form onSubmit={handleRegister}>
        <h2 className="text-primary">Pleaset Register !!!</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            requird
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register Now
        </Button>
        {success && <p className="text-success">User Created Successfully</p>}
        <p className="text-danger">{validPassword}</p>
      </Form>
      <p>
        <small>
          Already Have an account?? Plese <Link to="/login">Log In</Link>
        </small>
      </p>
    </div>
  );
};

export default ReactBootstrapRegisterForm;
