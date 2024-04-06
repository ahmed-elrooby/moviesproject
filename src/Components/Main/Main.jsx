import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./../Header/Header";
import Rights from "../Rights/Rights";

function Main() {
  return (
    <>
      <Header />
      <Outlet />
      <Rights />
    </>
  );
}

export default Main;
