import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { alertService } from "store/AlertService";

const AlertContainer = styled.div`
  position: absolute;
  max-width: 400px;
  color: #ffffff;
  padding: 15px;
  top: 35px;
  right: 35px;
  background: #3674ff;
  box-shadow: 0px 5px 5px rgba(54, 116, 255, 0.196733);
  border-radius: 5px 5px 5px 5px;
  z-index: 9999;
`;

export const Alert = () => {
  if (!alertService.message) return null;
  return <AlertContainer>{alertService.message}</AlertContainer>;
};

export default observer(Alert);
