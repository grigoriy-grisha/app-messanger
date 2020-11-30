import React from "react";
import { Messenger } from "../../components/Messenger";
import { AsideBar } from "../../components/AsideBar";

interface IProps {}

export const Main: React.FC<IProps> = () => {
  return (
    <div>
      <AsideBar />
      <Messenger />
    </div>
  );
};
