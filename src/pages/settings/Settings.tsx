import React, { useState } from "react";
import {
  Card,
  Typography,
  Tabs,
  Button,
  Modal,
  message,
  Divider,
  Space,
  Drawer,
} from "antd";
import {
  LogoutOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  BellOutlined,
  LockOutlined,
  BgColorsOutlined,
  GlobalOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useThemeContext } from "../../theme/ThemeContext";
import ProfileSettings from "../../components/settings/ProfileSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import PrivacySettings from "../../components/settings/PrivacySettings";
import ThemeSettings from "../../components/settings/ThemeSettings";
import LanguageSettings from "../../components/settings/LanguageSettings";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Colors } from "../../theme/colors";

const { Title, Text } = Typography;
const { confirm } = Modal;

export const Settings: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState("profile");
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);

  const handleLogout = () => {
    confirm({
      title: t("ARE_YOU_SURE_YOU_WANT_TO_LOGOUT"),
      icon: <ExclamationCircleOutlined style={{ color: Colors.primary }} />,
      content: t("YOU_WILL_NEED_TO_LOGIN_AGAIN"),
      okText: t("LOGOUT"),
      cancelText: t("CANCEL"),
      okButtonProps: { type: 'primary', danger: true },
      onOk() {
        localStorage.clear();
        message.success("Logged out successfully");
        navigate("/");
      },
    });
  };

  const handleDeleteAccount = () => {
    confirm({
      title: (
        <span style={{ color: Colors.danger }}>{t("DELETE_ACCOUNT")}</span>
      ),
      icon: <DeleteOutlined style={{ color: Colors.danger }} />,
      content: t("DELETE_WARNING"),
      okText: t("DELETE_ACCOUNT"),
      okType: "danger",
      cancelText: t("CANCEL"),
      onOk() {
        localStorage.clear();
        message.error("Account deleted successfully");
        navigate("/login");
      },
    });
  };

  const tabItems = [
    {
      key: "profile",
      label: (
        <Space size={12}>
          <UserOutlined />
          <span>{t("PROFILE_SETTINGS")}</span>
        </Space>
      ),
      children: (
        <div style={{ padding: "0 12px" }}>
          <ProfileSettings />
        </div>
      ),
    },
    {
      key: "notifications",
      label: (
        <Space size={12}>
          <BellOutlined />
          <span>{t("NOTIFICATION_SETTINGS")}</span>
        </Space>
      ),
      children: (
        <div style={{ padding: "0 12px" }}>
          <NotificationSettings />
        </div>
      ),
    },
    {
      key: "privacy",
      label: (
        <Space size={12}>
          <LockOutlined />
          <span>{t("PRIVACY_SECURITY")}</span>
        </Space>
      ),
      children: (
        <div style={{ padding: "0 12px" }}>
          <PrivacySettings />
        </div>
      ),
    },
    {
      key: "theme",
      label: (
        <Space size={12}>
          <BgColorsOutlined />
          <span>{t("APPLICATION_THEME")}</span>
        </Space>
      ),
      children: (
        <div style={{ padding: "0 12px" }}>
          <ThemeSettings />
        </div>
      ),
    },
    {
      key: "language",
      label: (
        <Space size={12}>
          <GlobalOutlined />
          <span>{t("LANGUAGE")}</span>
        </Space>
      ),
      children: (
        <div style={{ padding: "0 12px" }}>
          <LanguageSettings />
        </div>
      ),
    },
  ];

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    setMobileDrawerVisible(false);
  };

  return (
    <div className="settings-page-container">
      <div className="settings-header">
        <div className="settings-header-content">
          <div className="settings-title-section">
            <div className="mobile-menu-button">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setMobileDrawerVisible(true)}
                className="mobile-menu-toggle"
              />
            </div>
            <div>
              <Title
                level={2}
                className="settings-main-title"
              >
                {t("SETTINGS")}
              </Title>
              <Text type="secondary" className="settings-subtitle">
                Manage your account settings and preferences
              </Text>
            </div>
          </div>
        </div>
      </div>

      <Card className="settings-card">
        <div className="settings-layout">
          {/* Desktop Sidebar */}
          <div className="settings-sidebar-desktop">
            <Tabs
              activeKey={activeKey}
              onChange={handleTabChange}
              tabPosition="left"
              items={tabItems.map(item => ({
                key: item.key,
                label: item.label
              }))}
              className="settings-tabs-custom"
            />
          </div>

          {/* Mobile Drawer */}
          <Drawer
            title="Settings Menu"
            placement="left"
            onClose={() => setMobileDrawerVisible(false)}
            open={mobileDrawerVisible}
            width={280}
            className="settings-mobile-drawer"
          >
            <Tabs
              activeKey={activeKey}
              onChange={handleTabChange}
              tabPosition="top"
              items={tabItems.map(item => ({
                key: item.key,
                label: item.label
              }))}
              className="settings-tabs-mobile"
            />
          </Drawer>

          {/* Mobile Tabs Header */}
          <div className="settings-tabs-mobile-header">
            <Tabs
              activeKey={activeKey}
              onChange={handleTabChange}
              tabPosition="top"
              items={tabItems.map(item => ({
                key: item.key,
                label: (
                  <Space size={8}>
                    {React.cloneElement(item.label.props.children[0], { style: { fontSize: 16 } })}
                    <span className="mobile-tab-label">{item.label.props.children[1]}</span>
                  </Space>
                )
              }))}
              className="settings-tabs-horizontal"
            />
          </div>
          
          <div className="settings-content">
            <div className="settings-content-area">
              {tabItems.find(item => item.key === activeKey)?.children}
            </div>
            
            <Divider className="settings-divider" />

            <div className="danger-zone-section">
              <Title level={4} className="danger-zone-title">
                <ExclamationCircleOutlined />
                {t("DANGER_ZONE")}
              </Title>
              
              <Space direction="vertical" size={16} className="danger-zone-items">
                <div className="danger-zone-item logout-item">
                  <div className="danger-zone-item-content">
                    <Text strong className="danger-zone-item-title">
                      {t("LOGOUT_FROM_APPLICATION")}
                    </Text>
                    <Text type="secondary" className="danger-zone-item-description">
                      {t("SESSION_WILL_BE_TERMINATED")}
                    </Text>
                  </div>
                  <Button 
                    size="large"
                    icon={<LogoutOutlined />} 
                    onClick={handleLogout}
                    className="danger-zone-button logout-button"
                  >
                    {t("LOGOUT")}
                  </Button>
                </div>

                <div className="danger-zone-item delete-item">
                  <div className="danger-zone-item-content">
                    <Text strong className="danger-zone-item-title delete-title">
                      {t("DELETE_ACCOUNT")}
                    </Text>
                    <Text type="secondary" className="danger-zone-item-description">
                      {t("PERMANENTLY_DELETE_YOUR_ACCOUNT")}
                    </Text>
                  </div>
                  <Button
                    type="primary"
                    danger
                    size="large"
                    icon={<DeleteOutlined />}
                    onClick={handleDeleteAccount}
                    className="danger-zone-button delete-button"
                  >
                    {t("DELETE_ACCOUNT")}
                  </Button>
                </div>
              </Space>
            </div>
          </div>
        </div>
      </Card>

      <style>{`
        /* Base Styles */
        .settings-page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 0;
        }

        .settings-header {
          margin-bottom: 32px;
        }

        .settings-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .settings-title-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-menu-button {
          display: none;
        }

        .settings-main-title {
          color: ${isDarkMode ? "#ffffff" : "#000000"} !important;
          margin: 0 !important;
          font-size: 32px !important;
          font-weight: 800 !important;
        }

        .settings-subtitle {
          font-size: 16px !important;
        }

        .settings-card {
          border-radius: 20px !important;
          background: ${isDarkMode ? "#1f1f1f" : "#ffffff"} !important;
          border: 1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} !important;
          box-shadow: ${isDarkMode ? "none" : "0 4px 20px rgba(0,0,0,0.03)"} !important;
          overflow: hidden !important;
        }

        .settings-card .ant-card-body {
          padding: 0 !important;
        }

        .settings-layout {
          display: flex;
          min-height: 700px;
        }

        /* Desktop Sidebar */
        .settings-sidebar-desktop {
          width: 280px;
          border-right: 1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"};
          padding: 24px 0;
          background: ${isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"};
        }

        /* Mobile Drawer */
        .settings-mobile-drawer {
          display: none;
        }

        /* Mobile Tabs Header */
        .settings-tabs-mobile-header {
          display: none;
        }

        /* Content Area */
        .settings-content {
          flex: 1;
          padding: 32px 40px;
        }

        .settings-content-area {
          min-height: 400px;
        }

        .settings-divider {
          margin: 40px 0 !important;
        }

        /* Danger Zone Styles */
        .danger-zone-title {
          color: ${Colors.danger} !important;
          margin-bottom: 20px !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }

        .danger-zone-items {
          width: 100% !important;
        }

        .danger-zone-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .logout-item {
          background: ${isDarkMode ? "rgba(255,255,255,0.03)" : "#fffafa"} !important;
          border: 1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "#ffebeb"} !important;
        }

        .delete-item {
          background: ${isDarkMode ? "rgba(255, 77, 79, 0.05)" : "#fff1f0"} !important;
          border: 1px solid rgba(255, 77, 79, 0.2) !important;
        }

        .danger-zone-item-content {
          flex: 1;
        }

        .danger-zone-item-title {
          display: block !important;
          font-size: 16px !important;
          color: ${isDarkMode ? "#ffffff" : "#000000"} !important;
          margin-bottom: 4px !important;
        }

        .delete-title {
          color: ${Colors.danger} !important;
        }

        .danger-zone-item-description {
          font-size: 14px !important;
        }

        .danger-zone-button {
          border-radius: 10px !important;
          margin-left: 16px;
        }

        .delete-button {
          box-shadow: 0 4px 12px rgba(255, 77, 79, 0.2) !important;
        }

        /* Tabs Custom Styles */
        .settings-tabs-custom .ant-tabs-nav {
          width: 100% !important;
          margin-bottom: 0 !important;
        }

        .settings-tabs-custom .ant-tabs-tab {
          padding: 16px 24px !important;
          margin: 4px 12px !important;
          border-radius: 12px !important;
          transition: all 0.3s ease !important;
          border: none !important;
        }

        .settings-tabs-custom .ant-tabs-tab-active {
          background: ${Colors.primary}15 !important;
        }

        .settings-tabs-custom .ant-tabs-tab-active .ant-space {
          color: ${Colors.primary} !important;
          font-weight: 600 !important;
        }

        .settings-tabs-custom .ant-tabs-ink-bar {
          display: none !important;
        }

        .settings-tabs-custom .ant-tabs-nav-wrap {
          direction: ltr !important;
        }

        [dir="rtl"] .settings-tabs-custom .ant-tabs-tab {
          text-align: right !important;
        }

        /* Mobile Styles */
        @media (max-width: 992px) {
          .settings-page-container {
            padding: 16px;
          }

          .settings-header {
            margin-bottom: 24px;
          }

          .mobile-menu-button {
            display: block;
          }

          .settings-main-title {
            font-size: 28px !important;
          }

          .settings-subtitle {
            font-size: 14px !important;
          }

          .settings-layout {
            flex-direction: column;
            min-height: auto;
          }

          .settings-sidebar-desktop {
            display: none;
          }

          .settings-tabs-mobile-header {
            display: block;
            padding: 16px;
            border-bottom: 1px solid ${isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"};
            background: ${isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)"};
          }

          .settings-tabs-horizontal .ant-tabs-nav {
            margin-bottom: 0 !important;
          }

          .settings-tabs-horizontal .ant-tabs-tab {
            padding: 12px 16px !important;
            margin: 0 4px !important;
            border-radius: 8px !important;
            font-size: 14px !important;
          }

          .mobile-tab-label {
            font-size: 14px;
          }

          .settings-content {
            padding: 24px;
          }

          .settings-content-area {
            min-height: 300px;
          }

          .settings-divider {
            margin: 32px 0 !important;
          }

          .danger-zone-item {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
          }

          .danger-zone-button {
            margin-left: 0;
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .settings-page-container {
            padding: 12px;
          }

          .settings-header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .settings-main-title {
            font-size: 24px !important;
          }

          .settings-subtitle {
            font-size: 13px !important;
          }

          .settings-content {
            padding: 20px;
          }

          .settings-tabs-horizontal .ant-tabs-tab {
            padding: 10px 12px !important;
            font-size: 13px !important;
          }

          .mobile-tab-label {
            font-size: 13px;
          }

          .danger-zone-item {
            padding: 16px;
          }

          .danger-zone-item-title {
            font-size: 15px !important;
          }

          .danger-zone-item-description {
            font-size: 13px !important;
          }
        }

        @media (max-width: 480px) {
          .settings-page-container {
            padding: 8px;
          }

          .settings-content {
            padding: 16px;
          }

          .settings-tabs-horizontal .ant-tabs-tab {
            padding: 8px 10px !important;
            font-size: 12px !important;
          }

          .mobile-tab-label {
            font-size: 12px;
          }

          .danger-zone-item {
            padding: 12px;
          }

          .danger-zone-item-title {
            font-size: 14px !important;
          }

          .danger-zone-item-description {
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  );
};
