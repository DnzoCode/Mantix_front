import React, { useState } from "react";
import LoadComponent from "../Global/LoadComponent";
import apiLocation from "../../Api/Locations/location";
import { Toaster, toast } from "sonner";
import ErrorAlert from "../Global/ErrorAlert";

function LocationForm({ refetchData }) {
  const [modeForm, setModeForm] = useState("Register");
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState({
    location_name: "",
    status: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setLocation({
      ...location,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e, mode) => {
    e.preventDefault();
    if (mode == "Register") {
      setLoading(true);
      apiLocation
        .addLocation(location.location_name, location.status)
        .then((response) => {
          setLoading(false);
          toast.success("Locacion registrado correctamente");
          setLocation({
            location_name: "",
            status: 1,
          });
          apiLocation
            .getLocations()
            .then((response) => {
              refetchData(response.data);
            })
            .catch((error) => {
              toast.error(error.response.data.error);
            });
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.error);
        });
    } else if (mode == "Masivo") {
      setLoading(true);
      apiLocation
        .uploadLocations(file)
        .then(() => {
          apiLocation
            .getLocations()
            .then((response) => {
              refetchData(response.data);
            })
            .catch((error) => {
              setLoading(false);

              toast.error("error al hacer refecth");
            });
          setLoading(false);
          toast.success("Locaciones Cargadas correctamtente");
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Error al cargar");
          setError({
            ...error,
            isError: true,
            errorMessage: error.response.data.error,
          });
        });
    }
  };
  return (
    <>
      <Toaster richColors closeButton position="top-right" expand={false} />

      {loading ? (
        <LoadComponent />
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e, modeForm)}>
            <div className="w-full h-auto flex flex-col justify-center items-center">
              <div className="flex w-full items-center justify-end mt-6">
                <button
                  type="button"
                  className="p-2 bg-orange-400 rounded-lg mr-4 shadow-lg duration-300 px-4 hover:shadow-none"
                  onClick={() =>
                    modeForm == "Register"
                      ? setModeForm("Masivo")
                      : setModeForm("Register")
                  }
                >
                  Cargue Masivo
                </button>
                <button
                  className="p-2 bg-green-400 rounded-lg shadow-lg duration-300 px-4 mr-8 hover:shadow-none hover:bg-green-600 disabled:bg-green-200 disabled:shadow-none"
                  disabled={
                    modeForm == "Register"
                      ? !location.location_name || loading
                      : loading || !file
                  }
                >
                  Registrar Locacion
                </button>
              </div>
              {error.isError && <ErrorAlert error={error?.errorMessage} />}
              {modeForm == "Register" ? (
                <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
                  <div className="w-full flex items-center mt-8">
                    <div className="flex flex-col w-full pl-2">
                      <label htmlFor="" className="pl-2 pb-2 font-bold">
                        Nombre Locacion
                      </label>
                      <input
                        type="text"
                        name="location_name"
                        id="location_name"
                        value={location.location_name}
                        className="bg-gray-200 p-2 rounded-md"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
                  <div className="w-full flex items-center mt-8">
                    <div className="flex flex-col w-full pl-2">
                      <label htmlFor="" className="pl-2 pb-2 font-bold">
                        Cargar Documento
                      </label>
                      <input
                        type="file"
                        className="bg-gray-200 p-2 rounded-md"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default LocationForm;
