import React from "react";
import { Messenger } from "../../components/Messenger";
import { AsideBar } from "../../components/AsideBar";
import { CreateDialog } from "../../components/Modal/CreateDialog";

interface IProps {}

export const Main: React.FC<IProps> = () => {
  return (
    <div>
      <CreateDialog />
      <AsideBar />
      <Messenger />
    </div>
  );
};
