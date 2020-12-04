import React from "react";
import { Messenger } from "components/Messenger";
import AsideBar from "components/AsideBar";
import { observer } from "mobx-react-lite";
import Alert from "../../components/Alert/Alert";
import { alertService } from "../../store/AlertService";

const Main = () => {
  return (
    <div>
      {alertService.message && <Alert />}
      <AsideBar />
      <Messenger />
    </div>
  );
};

export default observer(Main);
