import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
// import LeftSideBar from "../components/LeftSideBar";

function MainLayout() {
  return (
    <div className=" w-[90%] mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
