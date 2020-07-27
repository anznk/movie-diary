import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => (
  <>
    <h1>Sorry... can't seem to find that page.</h1>
    <Link to="/">Back to home</Link>
  </>
);

export default NoMatch;