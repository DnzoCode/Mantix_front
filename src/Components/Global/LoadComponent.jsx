import React from "react";
import { MutatingDots } from "react-loader-spinner";

function LoadComponent() {
  return (
    <>
      <div className=" z-50 flex justify-center items-center w-full h-full bg-opacity-70 ">
        <MutatingDots
          height="100"
          width="100"
          color="#000"
          secondaryColor="#28385F"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}

export default LoadComponent;
