import React from "react";
import { Toaster } from "sonner";
import SideBar from "./SideBar";
import LoadPage from "./LoadPage";
import NavBar from "./NavBar";
function Layout({ children, loading, title }) {
  return (
    <>
      <Toaster richColors closeButton position="top-right" expand={false} />
      <div className="bg-dark-purple flex w-screen h-screen ">
        <SideBar />
        <main className="bg-primary-gray w-full  rounded-tl-3xl rounded-bl-3xl p-5  overflow-auto">
          <NavBar title={title} />
          {loading ? <LoadPage /> : <>{children}</>}
        </main>
      </div>
    </>
  );
}

export default Layout;
