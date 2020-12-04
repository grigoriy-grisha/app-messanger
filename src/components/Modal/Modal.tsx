import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = ({ children }: { children: JSX.Element }) => {
  const el = document.createElement("div");
  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);
  return ReactDOM.createPortal(children, el);
};

export default Modal;
