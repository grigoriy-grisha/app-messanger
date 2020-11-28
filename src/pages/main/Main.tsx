import React from "react";
import {MessengerContainer} from "../../components/MessengerContainer";
import {AsideBar} from "../../components/AsideBar";

interface IProps {}

export const Main: React.FC<IProps> = () => {
  return <div>
    <AsideBar />
    <MessengerContainer/>
  </div>;
};
