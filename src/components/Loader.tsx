import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const Loader = styled.div`
  width: 80px;
  height: 80px;

  :after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid;
      border-color: #7094CF transparent #7094CF transparent;
      animation: ${rotate} 1.2s linear infinite;
  }
  
}`;
export default Loader;
