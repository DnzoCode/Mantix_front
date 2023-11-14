import React from "react";
import {
  BiDotsHorizontalRounded,
  BiSolidPhone,
  BiSolidEnvelope,
  BiSolidEditLocation,
  BiUser,
  BiTask,
} from "react-icons/bi";
function UserCard({ username, location, email, role, loginName }) {
  return (
    <>
      <div className="bg-white shadow-md flex flex-col rounded-lg p-4 ">
        {/* HEAD CARD */}
        <div className="flex items-center w-full p-2">
          <img
            src="vite.svg"
            alt="LogoUSer"
            className="w-12 mr-5 object-fill"
          />
          <div className="flex flex-col items-start w-4/5">
            <h2 className="font-bold text-lg">{username}</h2>
            <span className="bg-green-100 text-sm text-green-950 p-1 rounded-lg">
              {role}
            </span>
          </div>
          {/* <div className="flex items-start justify-start top-6 h-full">
            <BiDotsHorizontalRounded className="text-xl cursor-pointer hover:bg-slate-200 hover:rounded-lg duration-100" />
          </div> */}
        </div>
        {/* CONTENT BODY */}
        <div className="flex flex-col justify-start items-start mt-4">
          <div className="flex justify-center items-center p-1">
            <BiSolidPhone className="text-blue-600 text-xl mr-2 mb-4" />
            <p className="mb-4">{loginName}</p>
          </div>
          <div className="flex justify-center items-center p-1">
            <BiSolidEnvelope className="text-blue-600 text-xl mr-2 mb-4" />
            <p className="mb-4">{email}</p>
          </div>
          <div className="flex justify-center items-center p-1">
            <BiSolidEditLocation className="text-blue-600 text-xl mr-2 mb-4" />
            <p className="mb-4">{location}</p>
          </div>
        </div>
        {/* FOOTER CARD */}
        {/* <div className="flex items-center justify-around gap-2 mt-4">
          <button className="bg-blue-200 w-1/2 rounded-lg p-1 flex items-center justify-center text-blue-900">
            <BiUser className="mr-2" />
            <span>Profile</span>
          </button>
          <button className="bg-blue-700 w-1/2 rounded-lg p-1 flex items-center justify-center text-white">
            <BiTask className="mr-2" />
            <span>Tareas</span>
          </button>
        </div> */}
      </div>
    </>
  );
}

export default UserCard;
