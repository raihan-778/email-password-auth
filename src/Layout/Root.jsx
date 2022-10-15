import React from "react";
import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <nav className="mx-auto">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
