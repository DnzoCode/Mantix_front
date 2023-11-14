import React from "react";
import { BiBuilding, BiGroup } from "react-icons/bi";

function LocationCard({ location }) {
  return (
    <>
      <div className="bg-white shadow-md flex flex-col rounded-lg p-4 ">
        {/* HEAD CARD */}
        <div className="flex items-center w-full p-2">
          <BiBuilding className="text-2xl mr-2" />

          <div className="flex flex-col items-start w-4/5">
            <h2 className="font-bold text-lg">{location.location_name}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationCard;
