import "./App.css";
import app from "./firebase/firebase.init";

import { getAuth } from "firebase/auth";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./components/LogInForm/LogIn";
import ReactBootstrapRegisterForm from "./components/RegisterForm/ReactBootstrapRegisterForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import Root from "./Layout/Root";

const auth = getAuth(app);

const handleRegister = (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log(email, password);
};
const handleEmailBlur = (event) => {
  console.log(event.target.value);
};
const handlePaswrdBlur = (event) => {
  console.log(event.target.value);
};

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children: [
        {
          path: "/",
          element: <ReactBootstrapRegisterForm></ReactBootstrapRegisterForm>,
        },
        {
          path: "login",
          element: <LogIn></LogIn>,
        },
        { path: "signup", element: <SignUpForm></SignUpForm> },
      ],
    },
  ]);

  return (
    <div className="">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
