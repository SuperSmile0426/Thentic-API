import React from "react";
import { Link } from "react-router-dom";

import { PATH } from "../../consts";

const NotFoundComponent = () => {
  return (
    <div >
      <h1>404</h1>
      <h1>
        This page does not exist
      </h1>
      <h2>
        The page you are looking for could not be found.
      </h2>
      <Link to={PATH.DASHBOARD}>
        Go to HomePage!
      </Link>
    </div>
  );
};

export default NotFoundComponent;
