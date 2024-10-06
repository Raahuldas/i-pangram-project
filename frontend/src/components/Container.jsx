import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./header/Navbar";

function Container() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}

export default Container;
