import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { useThemeContext } from "../theme/ThemeContext";
import { Colors } from "../theme/colors";
import { GLOBAL_TEXT } from "../constants/Strings";

const { Sider } = Layout;

const NAVIGATION = [
  {
    name: GLOBAL_TEXT.DASHBOARD,
    path: "/dashboard",
    icon: <DashboardOutlined />,
  },
  { name: GLOBAL_TEXT.PRODUCTS, path: "/products", icon: <AppstoreOutlined /> },
  { name: GLOBAL_TEXT.CUSTOMERS, path: "/customers", icon: <TeamOutlined /> },
  { name: GLOBAL_TEXT.ORDERS, path: "/orders", icon: <ShoppingCartOutlined /> },
  {
    name: GLOBAL_TEXT.ANALYTICS,
    path: "/analytics",
    icon: <LineChartOutlined />,
  },
  { name: GLOBAL_TEXT.SETTINGS, path: "/settings", icon: <SettingOutlined /> },
];

export const Sidebar: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const location = useLocation();

  return (
    <Sider
      width={250}
      theme={isDarkMode ? "dark" : "light"}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        fontWeight:600,
        borderRight: "1px solid var(--border)",
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: 24,
          color: "var(--text-h)",
        }}
      >
        <span style={{ color: Colors.primary, marginRight: 8 }}>Data</span>Hub
      </div>
      <div
        style={{
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {NAVIGATION.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink
              to={item.path}
              key={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                borderRadius: 8,
                color: isActive
                  ? Colors.white
                  : isDarkMode
                    ? Colors.textDark
                    : Colors.textLight,
                backgroundColor: isActive ? Colors.primary : "transparent",
                fontWeight: isActive ? 600 : 400,
                transition: "all 0.3s",
                textAlign: "center",
              }}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </Sider>
  );
};
