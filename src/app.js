import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter, NavLink, Route } from "react-router-dom";
//renderRoutes 读取路由配置转化为 Route 标签
import "./app.less";

console.log("测试下webpack.DefinePlugin里设置的全局变量，", COPYRIGHT);
const LazyHome = React.lazy(() => import("./pages/home"));
const LazyProfile = React.lazy(() =>
  import(/* webpackPrefetch:true */ "./pages/profile")//prefect 利用浏览器空闲时间提前预加载
);
const LazyHelp = React.lazy(() =>
  import(/* webpackPrefetch:true */ "./pages/help")
);
const LazyContactMe = React.lazy(() =>
  import(/* webpackPrefetch:true */ "./pages/contactMe")
);

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div>loading</div>}>
        <div className="top"> ZOE 今年27 </div>
        <div className="tab">
          <NavLink to="/" activeClassName="selected">
            <span className="tabItem"> home </span>
          </NavLink>
          <NavLink to="/profile" activeClassName="selected">
            <span className="tabItem"> profile </span>
          </NavLink>
          <NavLink to="/contactMe" activeClassName="selected">
            <span className="tabItem"> contact me </span>
          </NavLink>
          <NavLink to="/help" activeClassName="selected">
            <span className="tabItem"> help </span>
          </NavLink>
        </div>
        <Route path="/" exact={true} component={LazyHome} />
        <Route path="/profile" exact={true} component={LazyProfile} />
        <Route path="/contactMe" exact={true} component={LazyContactMe} />
        <Route path="/help" exact={true} component={LazyHelp} />
      </Suspense>
    </HashRouter>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
