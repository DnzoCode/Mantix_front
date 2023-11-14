import { BiCalendar } from "react-icons/bi";
import { useLocation } from "react-router-dom";
export default function NavBar({ title }) {
  const location = useLocation();

  return (
    <>
      <div className="w-full flex justify-between items-center pb-5">
        <h1 className="font-bold text-xl">{title}</h1>
        <div className="flex items-center justify-end">
          <BiCalendar className="text-3xl" />
          <div className="flex items-center"></div>
        </div>
      </div>
    </>
  );
}
