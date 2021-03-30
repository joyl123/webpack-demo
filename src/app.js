import React from "react";
import ReactDOM from "react-dom";
// import { HashRouter } from "react-router-dom";
// import getRoutes from "./routes";
import "./app.less";

const App = () => {
  return (
    // <HashRouter>
    //   <div className="right-content">{getRoutes()}</div>
    // </HashRouter>
    <div className="testClass"> webpack 基础配置demo</div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
