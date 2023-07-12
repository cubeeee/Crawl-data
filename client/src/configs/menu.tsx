import AppLayout from "@pages/AppLayout";
import Dashboard from "@pages/Dashboard";

import Proxy from "@pages/Proxy";
import User from "@pages/User";
import Facebook from "@pages/Facebook";
import type { MenuProps } from "antd";
import React from "react";
import { FaFacebookSquare, FaHome, FaNetworkWired, FaUser } from "react-icons/fa";
import { Navigate, RouteObject } from "react-router-dom";
import { APP_PREFIX_PATH } from ".";


type MenuItem = Required<MenuProps>["items"][number] & {
  path?: string;
  element?: React.ReactNode;
  index?: boolean;
  children?: MenuItem[];
};
const menus: MenuItem[] = [
  {
    label: "Trang Chủ",
    key: "",
    path: "/",
    element: <Dashboard />,
    icon: <FaHome />,
  },
  {
    label: "User",
    key: "user",
    path: "/user",
    element: <User />,
    icon: <FaUser />,
  },
  {
    label: "Proxy",
    key: "proxy",
    path: "/proxy",
    element: <Proxy />,
    icon: <FaNetworkWired />,
  },
  {
    label: "Facebook",
    key: "facebook",
    path: "/facebook",
    element: <Facebook />,
    icon: <FaFacebookSquare />,
  }, 
];
const getRoutes = (): RouteObject[] => {
  const routes: RouteObject[] = [];
  for (const item of menus) {
    const children: RouteObject[] = [];
    if (item.children) {
      for (const child of item.children) {
        children.push({
          element: child.element,
          path: child.path?.replace(/\//gm, ""),
          index: child.key?.toString().endsWith("_item"),
        });
      }
    }
    if (children.length > 0) {
      routes.push({
        path: item.path?.replace(/\//gm, ""),
        children,
      });
    } else {
      routes.push({
        path: item.path?.replace(/\//gm, ""),
        element: item.element,
      });
    }
  }
  return [
    {
      path: "/",
      element: <Navigate to={APP_PREFIX_PATH} />,
    },
    {
      path: "/login",
      element: <Navigate to={APP_PREFIX_PATH} />,
    },
    {
      path: APP_PREFIX_PATH,
      element: <AppLayout />,
      children: routes,
    },
  ];
};
export { getRoutes, menus };
export default menus;
