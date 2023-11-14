import React, { useState } from "react";
import EventForm from "../../Components/Event/EventForm";
import Layout from "../../Components/Global/Layout";

function Maintenance() {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Layout loading={loading} title={"Registrar Mantenimientos"}>
        <EventForm loadLayout={setLoading} />
      </Layout>
    </>
  );
}

export default Maintenance;
