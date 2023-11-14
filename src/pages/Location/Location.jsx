import React, { useEffect, useState } from "react";
import Layout from "../../Components/Global/Layout";
import { BiListUl, BiPlus, BiSolidGrid } from "react-icons/bi";
import apiLocation from "../../Api/Locations/location";
import Modal from "../../Components/Global/Modal/Modal";
import LocationCard from "../../Components/Location/LocationCard";
import LocationForm from "../../Components/Location/LocationForm";
import { toast } from "sonner";

function Location() {
  const [location, setLocation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    apiLocation
      .getLocations()
      .then((response) => {
        setLocation(response.data);
        setLoading(false);
        toast.success("Locaciones cargadas correctamente");
      })
      .catch((error) => {
        toast.error(
          "Error cargando locaciones, comunicate con un admin",
          error
        );
        setLoading(false);
      });
  }, []);

  const refetchLocation = (newLocationList) => {
    setLocation(newLocationList);
  };
  return (
    <>
      <Layout loading={loading} title={"Locaciones"}>
        <Modal
          setOpenModal={setOpenModal}
          isOpen={openModal}
          title={"Registrar Locacion"}
        >
          <LocationForm refetchData={refetchLocation} />
        </Modal>
        <div className="flex justify-between items-center p-4">
          <div></div>
          <div className="flex items-center">
            <button className="mr-4 p-2 rounded-lg flex items-center">
              <BiListUl />
            </button>
            <button className="mr-4 bg-blue-600 text-white p-2 rounded-lg flex items-center ">
              <BiSolidGrid />
            </button>
            <button
              className="bg-blue-600 text-white p-2 rounded-lg flex items-center hover:bg-blue-800 duration-100"
              onClick={() => setOpenModal(true)}
            >
              <BiPlus className="text-xl" />
              Agregar Locacion
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {location?.map((locat, index) => (
            <LocationCard key={index} location={locat} />
          ))}
        </div>
      </Layout>
    </>
  );
}

export default Location;
