import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
//renderRoutes 读取路由配置转化为 Route 标签
import { renderRoutes } from "react-router-config";
import routes from "./routes/index";
import "./app.less";

const App = () => {
  return (
    <HashRouter>
      {renderRoutes(routes)}
      {/* <div className="testClass">
        <div>webpack 基础配置demo</div>
      </div> */}
    </HashRouter>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
