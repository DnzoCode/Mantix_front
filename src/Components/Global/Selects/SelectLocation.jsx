import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { toast } from "sonner";
import apiLocation from "../../../Api/Locations/location";

const cachedLocation = new Map();

export default function SelectLocation({
  setObject,
  objectSelect,
  setLoading,
}) {
  const [selectedOptionLocation, setSelectedOptionLocation] = useState(null);

  const loadLocation = useCallback(async () => {
    if (cachedLocation.has("locations")) {
      setLocations(cachedLocation.get("locations"));
      setLoading(false);
    } else {
      try {
        const response = await apiLocation.getLocations();
        const locationData = response.data;
        setLocations(locationData);
        cachedLocation.set("locations", locationData);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.error);
        setLoading(false);
      }
    }
  }, [setLoading]);

  const [locations, setLocations] = useState(
    () => cachedLocation.get("locations") || null
  );

  useEffect(() => {
    loadLocation();
  }, [loadLocation]);

  const listMaquinas = locations?.map((location) => {
    return {
      value: location.id,
      label: `${location.location_name}`,
    };
  });

  const handleSelectChange = (selected) => {
    setSelectedOptionLocation(selected);
    setObject({ ...objectSelect, maquina: selected.value });
  };

  return (
    <>
      <Select
        options={listMaquinas}
        placeholder={"Selecciona la locacion"}
        name="location"
        value={selectedOptionLocation}
        onChange={(selected) => handleSelectChange(selected)}
      />
    </>
  );
}
