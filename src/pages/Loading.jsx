import React from "react";
import Spinner from "./../svgs/Spinner.jsx";

import "./../styles/loading.css";

function Loading({ message = null }) {
  return (
    <div className="loading_overpage overpage">
      <Spinner width={120} height={120} />
      {message && <span>{message}</span>}
    </div>
  );
}

export default Loading;
