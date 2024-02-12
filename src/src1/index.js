import React from "react";
import ReactDOM from "react-dom/client";
import BoardView from "./components/Board";
import "./main.scss";
import "./styles.scss";

const App1 = () => {
  return (
    <>
  <div id="boady1">
    <h1 id = "target"><span id="target_span"> 2048</span></h1>
  <BoardView />           
  </div>
  </>
  );
};
export default App1
