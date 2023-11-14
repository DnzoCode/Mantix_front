import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import apiTecnico from "../../../Api/Tecnicos/tecnico";
import { toast } from "sonner";

const cachedTecnicos = new Map();

export default function SelectTecnico({ setObject, objectSelect, setLoading }) {
  const [selectedOptionTecnico, setSelectedOptionTecnico] = useState(null);

  const loadTecnicos = useCallback(async () => {
    if (cachedTecnicos.has("tecnicos")) {
      setTecnicos(cachedTecnicos.get("tecnicos"));
      setLoading(false);
    } else {
      try {
        const response = await apiTecnico.getTecnicos();
        const tecnicosData = response.data;
        setTecnicos(tecnicosData);
        cachedTecnicos.set("tecnicos", tecnicosData);
        setLoading(false);
      } catch (error) {
        toast.error("Error al listar Tecnicos");
        setLoading(false);
      }
    }
  }, [setLoading]);

  const [tecnicos, setTecnicos] = useState(
    () => cachedTecnicos.get("tecnicos") || null
  );

  useEffect(() => {
    loadTecnicos();
  }, [loadTecnicos]);

  const listTecnicos = tecnicos?.map((tec) => {
    return {
      value: tec.id,
      label: `${tec.tecnico_name} ${tec.tecnico_apellido}`,
    };
  });

  const handleSelectChange = (selected) => {
    setSelectedOptionTecnico(selected);
    setObject({ ...objectSelect, tecnico: selected.value });
  };

  return (
    <>
      <Select
        options={listTecnicos}
        placeholder={"Selecciona el tecnico responsable"}
        name="tecnico"
        value={selectedOptionTecnico}
        onChange={(selected) => handleSelectChange(selected)}
      />
    </>
  );
}
