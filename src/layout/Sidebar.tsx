import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  LineChartOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import { useThemeContext } from "../theme/ThemeContext";
import { GLOBAL_TEXT } from "../constants/Strings";
import "./layout.css";
import { Colors } from "../theme/colors";

const { Sider } = Layout;

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const NAVIGATION: NavigationItem[] = [
  {
    name: GLOBAL_TEXT.DASHBOARD,
    path: "/dashboard",
    icon: <DashboardOutlined />,
  },
  { name: GLOBAL_TEXT.PRODUCTS, path: "/products", icon: <AppstoreOutlined /> },
  { name: GLOBAL_TEXT.WISH_LIST, path: "/wishlist", icon: <HeartOutlined /> },
  { name: GLOBAL_TEXT.ORDERS, path: "/orders", icon: <ShoppingCartOutlined /> },
  {
    name: GLOBAL_TEXT.ANALYTICS,
    path: "/analytics",
    icon: <LineChartOutlined />,
  },
  { name: GLOBAL_TEXT.SETTINGS, path: "/settings", icon: <SettingOutlined /> },
];

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onCollapse,
  mobileOpen,
  onMobileClose,
}) => {
  const { isDarkMode } = useThemeContext();
  const location = useLocation();

  const siderWidth = collapsed ? 80 : 250;

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${mobileOpen ? "visible" : ""}`}
        onClick={onMobileClose}
      />

      <Sider
        width={siderWidth}
        collapsed={collapsed}
        collapsedWidth={80}
        trigger={null}
        theme={isDarkMode ? "dark" : "light"}
        className={`sidebar ${collapsed ? "sidebar-collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}
        style={{ width: siderWidth }}
      >
        {/* Collapse toggle button (desktop only) */}
        <div
          className={`sidebar-header ${collapsed ? "collapsed" : "expanded"}`}
        >
          <button
            onClick={() => onCollapse(!collapsed)}
            aria-label="Toggle sidebar"
            className="toggle-btn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>

          {!collapsed && (
            <span className="logo-text">
              <span className="logo-accent">Data</span>Hub
            </span>
          )}
        </div>

        {/* Navigation */}

        <nav className="sidebar-nav">
          {NAVIGATION.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <NavLink
                to={item.path}
                key={item.path}
                className={`sidebar-link ${isActive ? "active" : ""}`}
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
                onClick={onMobileClose}
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                <span className="sidebar-link-text">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </Sider>
    </>
  );
};
