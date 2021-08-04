import React from "react";
import { NavLink } from "react-router-dom"; // 利用 NavLink 组件进行路由跳转,相比link, NavLink可以写active
import { renderRoutes } from "react-router-config";
import { Button } from "@components/index";
import "./index.less";

interface Props {
  // router 类型接口不好写 暂时any
  route: any;
}
const Home: React.FC<Props> = (props: Props) => {
  const { route } = props;
  return (
    <div className={"Home"}>
      <div className="top"> ZOE 今年27 ZOE 今年27</div>
      <div className="tab">
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
      {/* 坑1的解决: Home 处于routes中数组第一层，后面的功能组件在第二层，
     需在 Home 中再次调用 renderRoutes  否则 正常渲染其他页面
      只 */}
      {renderRoutes(route.routes)}
      <Button />
    </div>
  );
};
export default Home;
