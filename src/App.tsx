import React from "react";
import Routes from "./components/Routes";
import { Alert } from "./components/Alert/Alert";
import styled from "styled-components";

export const CenterElement = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
`;

function App() {
  return (
    <>
      <Alert />
      <Routes />
    </>
  );
}

export default App;
