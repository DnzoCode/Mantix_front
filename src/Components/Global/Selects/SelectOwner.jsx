import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { toast } from "sonner";
import apiAuth from "../../../Api/Auth/auth";

const cachedOwners = new Map();

export default function SelectMaquina({ setObject, objectSelect, setLoading }) {
  const [selectedOptionOwner, setSelectedOptionOwner] = useState(null);

  const loadOwners = useCallback(async () => {
    if (cachedOwners.has("owners")) {
      setOwners(cachedOwners.get("owners"));
      setLoading(false);
    } else {
      try {
        const response = await apiAuth.getOwners();
        const ownersData = response.data;
        setOwners(ownersData);
        cachedOwners.set("owners", ownersData);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.error);
        setLoading(false);
      }
    }
  }, [setLoading]);

  const [owners, setOwners] = useState(
    () => cachedOwners.get("owners") || null
  );

  useEffect(() => {
    loadOwners();
  }, [loadOwners]);

  const listOwners = owners?.map((owner) => {
    return {
      value: owner.id,
      label: `${owner.user_name} - ${owner.user_lastname}`,
    };
  });

  const handleSelectChange = (selected) => {
    setSelectedOptionOwner(selected);
    setObject({ ...objectSelect, owner: selected.value });
  };

  return (
    <>
      <Select
        options={listOwners}
        placeholder={"Selecciona el dueno de proceso"}
        name="owner"
        value={selectedOptionOwner}
        onChange={(selected) => handleSelectChange(selected)}
      />
    </>
  );
}
