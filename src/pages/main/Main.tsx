import React from "react";
import { Messenger } from "../../components/Messenger";
import AsideBar from "../../components/AsideBar";
import { Loader } from "../../components/Loader";

export const Main = () => {
  return (
    <div>
      <AsideBar />
      <Messenger />
    </div>
  );
};
