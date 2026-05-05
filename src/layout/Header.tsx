import React from "react";
import { Layout, Input as Avatar, Dropdown, Badge } from "antd";
import type { MenuProps } from "antd";
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useThemeContext } from "../theme/ThemeContext";
import { useAuth } from "../hooks/useAuth";
import { GLOBAL_TEXT } from "../constants/Strings";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const greeting = getGreeting();

  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning,";
    if (hour < 17) return "Good afternoon,";
    return "Good evening,";
  }

  const userMenu: MenuProps["items"] = [
    {
      key: "1",
      label: GLOBAL_TEXT.PROFILE,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: GLOBAL_TEXT.SETTINGS,
      onClick: () => navigate("/settings"),
      icon: <SettingOutlined />,
    },
    { type: "divider" },
    {
      key: "3",
      label: GLOBAL_TEXT.LOGOUT,
      onClick: () => logout(),
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  return (
    <AntHeader className="app-header">
      {/* Hamburger (mobile only) */}
      <button className="hamburger-btn" onClick={onMobileMenuToggle}>
        <MenuOutlined />
      </button>

      {/* Greeting */}
      <div className="header-greeting">
        <p>{greeting}</p>
        <h2>
          {user?.firstName} {user?.lastName}
        </h2>
      </div>

      {/* Search */}
      {/* <div className="header-search">
        <AntInput
          placeholder="Search..."
          prefix={<SearchOutlined style={{ color: "var(--text-secondary)" }} />}
          style={{
            height: 40,
            width: 320,
            borderRadius: 20,
            background: "var(--bg)",
            border: "none",
          }}
        />
      </div> */}

      {/* Actions */}
      <div className="header-actions">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <SunOutlined style={{ color: "#fbbf24" }} />
          ) : (
            <MoonOutlined />
          )}
        </button>

        <Badge count={3} size="small">
          <BellOutlined
            style={{ fontSize: 20, color: "var(--text)", cursor: "pointer" }}
          />
        </Badge>

        <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
          <div className="header-profile">
            <Avatar
              size={40}
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
            />
            <div className="header-profile-info">
              <span className="header-profile-name">{user?.firstName}</span>
              <span className="header-profile-role">Admin</span>
            </div>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};
