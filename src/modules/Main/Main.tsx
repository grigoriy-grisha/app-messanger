import React from "react";
import Messenger from "modules/Messenger";
import AsideBar from "modules/AsideBar";
import { observer } from "mobx-react-lite";
import Alert from "components/Alert/Alert";
import { alertService } from "store/AlertService";

const Main = () => {
  return (
    <div>
      {alertService.message && <Alert message={alertService.message} />}
      <AsideBar />
      <Messenger />
    </div>
  );
};

export default observer(Main);
