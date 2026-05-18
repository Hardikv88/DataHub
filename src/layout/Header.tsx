import React from "react";
import { Layout, Avatar, Dropdown, Badge, Popover } from "antd";
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
import { useNavigate } from "react-router-dom";
import { NotificationList } from "../components/common/NotificationList";
import { useTranslation } from "react-i18next";

const { Header: AntHeader } = Layout;

interface HeaderProps {
  onMobileMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { t } = useTranslation();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const greeting = getGreeting();

  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "GREETING_MORNING";
    if (hour < 17) return "GREETING_AFTERNOON";
    return "GREETING_EVENING";
  }

  const userMenu: MenuProps["items"] = [
    {
      key: "1",
      label: t("PROFILE"),
      onClick: () => navigate("/profile"),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: t("SETTINGS"),
      onClick: () => navigate("/settings"),
      icon: <SettingOutlined />,
    },
    { type: "divider" },
    {
      key: "3",
      label: t("LOGOUT"),
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
        <p>{t(greeting)}</p>
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

        <Popover
          content={<NotificationList />}
          trigger="click"
          placement="bottomRight"
          overlayClassName="notification-popover"
          arrow={{ pointAtCenter: true }}
        >
          <Badge count={3} size="small" style={{ cursor: "pointer" }}>
            <BellOutlined
              style={{ fontSize: 20, color: "var(--text)", cursor: "pointer" }}
            />
          </Badge>
        </Popover>

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
