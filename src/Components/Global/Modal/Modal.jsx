import { BiX } from "react-icons/bi";

function Modal({ children, setOpenModal, isOpen, title }) {
  return (
    <>
      <div
        className={`top-0 right-0 left-0 h-screen z-50  bg-dark-purple bg-opacity-70 flex justify-center items-end md:items-center  ${
          isOpen ? "fixed" : "hidden "
        }`}
      >
        <div
          className={`bg-white w-full md:w-2/4 lg:w-3/4 rounded-xl shadow-lg h-3/4 p-4 lg:h-5/6 overflow-auto`}
        >
          <div className="flex w-full justify-between">
            <span className="font-bold">{title}</span>
            <BiX
              className="text-3xl cursor-pointer"
              onClick={() => setOpenModal(false)}
            />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;
