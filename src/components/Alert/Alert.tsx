import styled from "styled-components";
import {observer} from "mobx-react-lite";
import React from "react";
import {alertService} from "../../store/AlertService";

const AlertContainer = styled.div`
  position: absolute;
  max-width: 400px;
  color: #ffffff;
  padding: 15px;
  top: 35px;
  right: 35px;
  background: #3674FF;
  box-shadow: 0px 5px 5px rgba(54, 116, 255, 0.196733);
  border-radius: 5px 5px 5px 5px;
  z-index: 9999;
`


export const Alert = observer(() => {

  return (
    <>
      {alertService.message && <AlertContainer>{alertService.message}</AlertContainer>}
    </>

  )
})