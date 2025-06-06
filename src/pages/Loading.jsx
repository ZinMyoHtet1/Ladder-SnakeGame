import React from "react";
import Spinner from "./../svgs/Spinner.jsx";

function Loading() {
  return (
    <div className="loading_overpage overpage">
      <Spinner width={120} height={120} />
    </div>
  );
}

export default Loading;
