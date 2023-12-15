import React from "react";
import spinner from "../assets/spinner.svg"
const Spinner = () => {
  return (
    <div>
      <div className="flex justify-center bg-black bg-opacity-40 items-center w-full fixed left-0 right-0 bottom-0 top-0 z-50">
        <img src={spinner} alt="Loading..." className="h-52"/>
      </div>
    </div>
  );
};

export default Spinner;