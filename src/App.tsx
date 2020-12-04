import React from "react";
import styled from "styled-components";
import Routes from "route/Routes";
import Alert from "components/Alert/Alert";
import { alertService } from "./store/AlertService";

export const CenterElement = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

export const PreventiveMessage = styled.h2`
  font-size: 21px;
  color: #666666;
`;

function App() {
  return (
    <>
      <Routes />
    </>
  );
}

export default App;
