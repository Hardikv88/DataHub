import React, { use } from "react";
import { Layout, Input as AntInput, Avatar, Dropdown, Switch } from "antd";
import type { MenuProps } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useThemeContext } from "../theme/ThemeContext";
import { Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/useAuth";
import { GLOBAL_TEXT } from "../constants/Strings";
const { Header: AntHeader } = Layout;

export const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  const userMenu: MenuProps["items"] = [
    {
      key: "1",
      label: GLOBAL_TEXT.PROFILE,
      onClick: () => {
        console.log("Navigate to profile");
      },
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: GLOBAL_TEXT.SETTINGS,
      onClick: () => {
        console.log("Navigate to Settings");
      },
      icon: <SettingOutlined />,
    },
    { type: "divider" },
    {
      key: "3",
      label: GLOBAL_TEXT.LOGOUT,
      onClick: () => {
        logout();
      },
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const { logout, user } = useAuth();
  const greeting = getGreeting();

  function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning,";
    if (hour < 17) return "Good afternoon,";
    return "Good evening,";
  }

  return (
    <AntHeader
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        background: "var(--card-bg)",
        borderBottom: "1px solid var(--border)",
        height: 70,
        lineHeight: "70px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0, // ❗ remove negative gap
        }}
      >
        <p
          style={{
            color: "var(--text)",
            fontSize: 14,
            margin: 0,
            lineHeight: "16px", // ✅ control spacing
          }}
        >
          {greeting}
        </p>

        <h2
          style={{
            color: "var(--text)",
            fontSize: 16,
            margin: 0,
            lineHeight: "18px", // ✅ reduce default spacing
          }}
        >
          {user?.firstName} {user?.lastName}
        </h2>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <AntInput
          placeholder="Search..."
          prefix={<SearchOutlined style={{ color: "var(--text)" }} />}
          style={{
            height: 40,
            width: 320,
            borderRadius: 20,
            background: "var(--bg)",
            border: "none",
            color: "var(--text)",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          shape="circle"
          size="middle"
          className="
    flex items-center justify-center
    bg-gray-100 dark:bg-white/5
    border border-gray-200 dark:border-gray-700/50
    text-gray-600 dark:text-gray-300
    hover:bg-gray-200 dark:hover:bg-white/10
    hover:text-gray-900 dark:hover:text-white
    transition-all duration-200
  "
          icon={
            isDarkMode ? (
              <SunOutlined
                style={{ color: "#fbbf24", transform: "rotate(12deg)" }}
              />
            ) : (
              <MoonOutlined />
            )
          }
        />
        <BellOutlined
          style={{ fontSize: 20, color: "var(--text)", cursor: "pointer" }}
        />
        <Dropdown menu={{ items: userMenu }} placement="bottomRight" arrow>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: 12,
            }}
          >
            <Avatar
              size={40}
              src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix"
            />
            <div
              style={{
                lineHeight: "1.2",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontWeight: 600, color: "var(--text)" }}>
                {user?.firstName}
              </span>
              <span style={{ fontSize: 12, color: "var(--text)" }}>Admin</span>
            </div>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};
