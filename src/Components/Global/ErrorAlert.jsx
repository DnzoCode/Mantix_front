import React from "react";

function ErrorAlert({ error }) {
  return (
    <>
      <div className=" w-full h-auto flex flex-row justify-center mt-4 p-2">
        <div className="w-2 h-full bg-red-900"></div>
        <div className="w-11/12 bg-red-300 p-4 rounded-md shadow-md">
          <span className="text-red-900 font-bold">{error}</span>
        </div>
      </div>
    </>
  );
}

export default ErrorAlert;
