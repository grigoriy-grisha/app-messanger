import React from "react";
import { Messenger } from "../../components/Messenger";
import AsideBar from "../../components/AsideBar";
import { AddDialog } from "../../components/Modal/AddDialog/AddDialog";

interface IProps {}

export const Main: React.FC<IProps> = () => {
  return (
    <div>
      {/*<AddDialog />*/}
      <AsideBar />
      <Messenger />
    </div>
  );
};
