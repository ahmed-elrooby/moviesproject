import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./../Header/Header";

function Main({ current,remove }) {
  return (
    <>
      <Header current={current} remove={remove} />
      <Outlet />

    </>
  );
}

export default Main;
