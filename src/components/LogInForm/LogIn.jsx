import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";

const auth = getAuth(app);

const LogIn = () => {
  const [success, setSuccess] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
      })
      .catch((error) => {
        console.error("error:", error);
      });
  };
  return (
    <div className="w-50 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Enter Your Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="formGroupExampleInput"
            placeholder="Example input placeholder"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Enter Your Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="formGroupExampleInput2"
            placeholder="Another input placeholder"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Sign In
        </button>
      </form>
      {success && <p className="text-success">User Log In SuccessFully</p>}

      <p>
        Don't Have an Account?? Pleast <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default LogIn;
