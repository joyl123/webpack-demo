import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
//renderRoutes 读取路由配置转化为 Route 标签
import { renderRoutes } from "react-router-config";
import moment from "moment";
//手动引入所需要的语言包，IgnorePlugin 里ignore了语言包，这里需要手动引入使用
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import routes from "./routes/index";
import "./app.less";

console.log("测试下webpack.DefinePlugin里设置的全局变量，", COPYRIGHT);
console.log("moment    ", moment().endOf("day").fromNow());
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
