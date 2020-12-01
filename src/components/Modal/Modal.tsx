import { useEffect } from "react";
import ReactDOM from "react-dom";

export const Modal = ({ children }: { children: JSX.Element }) => {
  const el = document.createElement("div");
  useEffect(() => {
    document.appendChild(el);
    return () => {
      document.removeChild(el);
    };
  }, []);

  return ReactDOM.createPortal(children, el);
};
