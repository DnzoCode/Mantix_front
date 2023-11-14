import React from "react";
import { MutatingDots } from "react-loader-spinner";
function LoadPage() {
  return (
    <>
      <div className="fixed  top-0 left-0 z-50 flex justify-center items-center bg-black w-full h-full bg-opacity-70">
        <MutatingDots
          height="100"
          width="100"
          color="#fff"
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

export default LoadPage;
