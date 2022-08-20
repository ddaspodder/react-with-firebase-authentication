import React from "react";
import classes from "./Error.module.css";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className={classes["error-wrapper"]}>
      <h1>Page not found</h1>
      <p>
        You might want to go to the <Link to="/">Home Page</Link> instead.
      </p>
    </div>
  );
};

export default Error;
