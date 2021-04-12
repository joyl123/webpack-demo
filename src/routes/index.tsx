import React from "react";
import { Redirect } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Help from "../pages/Help";
import ContactMe from "../pages/ContactMe";

//eslint-disable-next-line
export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        // 通过Redirect 显示默认 组件 
        render: () => <Redirect to={"/profile"} />,
      },
      {
        path: "/profile",
        component: Profile,
      },
      {
        path: "/contactMe",
        component: ContactMe,
      },
      {
        path: "/help",
        component: Help,
      },
    ],
  },
];
