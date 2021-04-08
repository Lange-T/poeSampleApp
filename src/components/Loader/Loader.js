import React from "react";
import "./Loader.css";

//Function that is displayed while useFetch is
//Getting data from an api
export default function Loader() {
  return (
    <div className="loader">
      <div className="fade">
        <div className="loader-text">Loading....</div>
      </div>
    </div>
  );
}
