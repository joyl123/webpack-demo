import React from "react";
import { Redirect } from "react-router-dom";
import { Home, Profile, Help, ContactMe } from "@pages/index";

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
