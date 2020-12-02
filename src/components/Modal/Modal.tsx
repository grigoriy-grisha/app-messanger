import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

export const Modal = ({ children }: { children: JSX.Element }) => {
  const el = document.createElement("div");
  useEffect(() => {
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);
  return ReactDOM.createPortal(children, el);
};
