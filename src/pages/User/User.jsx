import React, { useEffect, useState } from "react";
import Layout from "../../Components/Global/Layout";
import { BiPlus, BiSolidGrid, BiListUl } from "react-icons/bi";
import apiAuth from "../../Api/Auth/auth";
import UserCard from "../../Components/User/UserCard";
import Modal from "../../Components/Global/Modal/Modal";
import UserForm from "../../Components/User/UserForm";
import { toast } from "sonner";

function User() {
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const MemoizedUserCard = React.memo(UserCard);

  useEffect(() => {
    apiAuth
      .getUsers()
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
        toast.success("Usuarios cargados correctamente");
      })
      .catch((error) => {
        toast.error("Error fetching users", error);
        setLoading(false);
      });
  }, []);

  const refetchUser = (newUserList) => {
    setUsers(newUserList);
  };
  return (
    <>
      <Layout loading={loading} title={"Usuarios"}>
        <Modal
          setOpenModal={setOpenModal}
          isOpen={openModal}
          title={"Registrar Usuarios"}
        >
          <UserForm refetchData={refetchUser} />
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
              Add New
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-4">
          {users.map((user) => (
            <MemoizedUserCard
              key={user.id}
              username={`${user.user_name} ${user.user_lastname}`}
              email={user.user_email}
              role={user.role?.role}
              location={user.location?.location_name}
              loginName={user.user_login}
            />
          ))}
        </div>
      </Layout>
    </>
  );
}

function areEqual(prevProps, nextProps) {
  // Si 'open' no cambia, no hay necesidad de volver a renderizar
  return prevProps.users === nextProps.users;
}

export default React.memo(User, areEqual);
