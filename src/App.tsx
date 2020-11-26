import React from "react";
import "./App.css";
import { RootStateProvider } from "./Store/RootStateContext";

function App() {
  return (
    <RootStateProvider>
      <div className="App"></div>
    </RootStateProvider>
  );
}

export default App;
