import React from "react";
import { Link } from "react-router-dom";
import Raven404 from "../assets/images/Raven404.png";

//page not found
const PageNotFound = () => {
  return (
    <div>

      <h2>Même Raven ne sait pas ou tu es...</h2>
      <img src={Raven404} alt="Raven 404" />
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default PageNotFound;
