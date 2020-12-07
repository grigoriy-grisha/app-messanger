import React from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

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
interface AlertInterface {
  message: string;
}
export const Alert = ({ message }: AlertInterface) => {
  return <AlertContainer>{message}</AlertContainer>;
};

export default observer(Alert);
