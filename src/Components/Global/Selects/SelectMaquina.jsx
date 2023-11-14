import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { toast } from "sonner";
import apiMaquina from "../../../Api/Maquina/maquina";

const cachedMaquinas = new Map();

export default function SelectMaquina({ setObject, objectSelect, setLoading }) {
  const [selectedOptionMaquina, setSelectedOptionMaquina] = useState(null);

  const loadMaquinas = useCallback(async () => {
    setLoading(true);
    if (cachedMaquinas.has("maquinas")) {
      setMaquinas(cachedMaquinas.get("maquinas"));
      setLoading(false);
    } else {
      try {
        const response = await apiMaquina.getMaquinas();
        const maquinasData = response.data;
        setMaquinas(maquinasData);
        cachedMaquinas.set("maquinas", maquinasData);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.error);
        setLoading(false);
      }
    }
  }, [setLoading]);

  const [maquinas, setMaquinas] = useState(
    () => cachedMaquinas.get("maquinas") || null
  );

  useEffect(() => {
    loadMaquinas();
  }, [loadMaquinas]);

  const listMaquinas = maquinas?.map((maq) => {
    return {
      value: maq.id,
      label: `${maq.maquina_name} - ${maq.numero_serial}`,
    };
  });

  const handleSelectChange = (selected) => {
    setSelectedOptionMaquina(selected);
    setObject({ ...objectSelect, maquina: selected.value });
  };

  return (
    <>
      <Select
        options={listMaquinas}
        placeholder={"Selecciona la Maquina para programar mantenimiento"}
        name="maquina"
        value={selectedOptionMaquina}
        onChange={(selected) => handleSelectChange(selected)}
      />
    </>
  );
}
