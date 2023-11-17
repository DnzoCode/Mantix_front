import React, { useState } from "react";
import LoadComponent from "../Global/LoadComponent";
import ErrorAlert from "../Global/ErrorAlert";
import SelectLocation from "../Global/Selects/SelectLocation";
import apiMaquina from "../../Api/Maquina/maquina";
import { toast } from "sonner";

function MaquinaForm({ refetchData }) {
  const [modeForm, setModeForm] = useState("Register");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const [maquina, setMaquina] = useState({
    maquina_name: "",
    maquina_modelo: "",
    numero_serial: "",
    ultimo_mantenimiento: "",
    location: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setMaquina({
      ...maquina,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e, mode) => {
    e.preventDefault();
    if (mode == "Register") {
      setLoading(true);
      await apiMaquina
        .addMaquinas(
          maquina.maquina_name,
          maquina.maquina_modelo,
          maquina.numero_serial,
          maquina.location,
          1
        )
        .then(() => {
          setLoading(false);
          setMaquina({
            maquina_name: "",
            maquina_modelo: "",
            numero_serial: "",
            ultimo_mantenimiento: "",
            location: "",
          });

          apiMaquina.getMaquinas().then((response) => {
            refetchData(response.data);
          });
          toast.success("Maquina registrada correctamente");
        })
        .catch((error) => {
          toast.error("Error al registrar maquina");
          console.log(error);
        });
    } else if (mode == "Masivo") {
      setLoading(true);

      await apiMaquina
        .uploadMaquina(file)
        .then((response) => {
          setLoading(false);
          apiMaquina.getMaquinas().then((response) => {
            refetchData(response.data);
          });
          toast.success("Maquinas cargadas correctamente");
        })
        .catch((error) => {
          setLoading(false);
          toast.error("Error al cargar");
          setError({
            ...error,
            isError: true,
            errorMessage: error.response.data.errors,
          });
        });
    }
  };
  return (
    <>
      {loading ? (
        <LoadComponent />
      ) : (
        <>
          <form onSubmit={(e) => handleSubmit(e, modeForm)}>
            <div className="w-full h-auto flex flex-col justify-center items-center">
              {error.isError && <ErrorAlert error={error.errorMessage} />}
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
                      ? !maquina.maquina_name ||
                        !maquina.maquina_modelo ||
                        !maquina.numero_serial ||
                        loading
                      : loading || file == null
                  }
                >
                  Registrar Maquina
                </button>
              </div>
              <div className="w-11/12 bg-white rounded-lg shadow-xl mt-12 flex flex-col justify-center p-4">
                {modeForm == "Register" ? (
                  <>
                    <div className="w-full flex items-center justify-center">
                      <label htmlFor="" className="pl-2 pb-2 font-bold mr-12">
                        Area ubicacion
                      </label>
                      <SelectLocation
                        setObject={setMaquina}
                        objectSelect={maquina}
                        setLoading={setLoading}
                      />
                    </div>
                    <div className="w-full flex items-center mt-8">
                      <div className="flex flex-col w-1/2 pr-2">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Nombre de la Maquina
                        </label>
                        <input
                          type="text"
                          name="maquina_name"
                          id="maquina_name"
                          value={maquina.maquina_name}
                          className="bg-gray-200 p-2 rounded-md"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col w-1/2 pl-2">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Modelo de la maquina
                        </label>
                        <input
                          type="text"
                          name="maquina_modelo"
                          id="maquina_modelo"
                          value={maquina.maquina_modelo}
                          className="bg-gray-200 p-2 rounded-md"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="w-full flex items-center mt-8">
                      <div className="flex flex-col w-full pr-2">
                        <label htmlFor="" className="pl-2 pb-2 font-bold">
                          Numero Serial
                        </label>
                        <input
                          type="text"
                          name="numero_serial"
                          id="numero_serial"
                          value={maquina.numero_serial}
                          className="bg-gray-200 p-2 rounded-md"
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex items-center mt-8">
                    <label htmlFor="" className="pl-2 pb-2 font-bold">
                      Cargar Archivo
                    </label>
                    <input
                      type="file"
                      className="bg-gray-200 p-2 rounded-md"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default MaquinaForm;
