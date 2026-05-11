import React from "react";
import {
  Card,
  Typography,
  Tabs,
  Button,
  Modal,
  message,
  Divider,
  Space,
} from "antd";
import {
  LogoutOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { GLOBAL_TEXT } from "../../constants/Strings";
import { useThemeContext } from "../../theme/ThemeContext";
import ProfileSettings from "../../components/settings/ProfileSettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import PrivacySettings from "../../components/settings/PrivacySettings";
import ThemeSettings from "../../components/settings/ThemeSettings";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
const { confirm } = Modal;

export const Settings: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    confirm({
      title: GLOBAL_TEXT.ARE_YOU_SURE_YOU_WANT_TO_LOGOUT,
      icon: <ExclamationCircleOutlined />,
      content: GLOBAL_TEXT.YOU_WILL_NEED_TO_LOGIN_AGAIN,
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
        <span style={{ color: "#ff4d4f" }}>{GLOBAL_TEXT.DELETE_ACCOUNT}</span>
      ),
      icon: <DeleteOutlined style={{ color: "#ff4d4f" }} />,
      content: GLOBAL_TEXT.DELETE_WARNING,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
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
        <span>
          {GLOBAL_TEXT.PROFILE_SETTINGS}
        </span>
      ),
      children: <ProfileSettings />,
    },
    {
      key: "notifications",
      label: (
        <span>
          {GLOBAL_TEXT.NOTIFICATION_SETTINGS}
        </span>
      ),
      children: <NotificationSettings />,
    },
    {
      key: "privacy",
      label: (
        <span>
          {GLOBAL_TEXT.PRIVACY_SECURITY}
        </span>
      ),
      children: <PrivacySettings />,
    },
    {
      key: "theme",
      label: (
        <span>
          
          {GLOBAL_TEXT.APPLICATION_THEME}
        </span>
      ),
      children: <ThemeSettings />,
    },
  ];

  return (
    <div>
      <Title
        level={2}
        style={{ color: isDarkMode ? "#ffffff" : "#000000", marginBottom: 24 }}
      >
        {GLOBAL_TEXT.SETTINGS}
      </Title>

      <Card
        style={{
          borderRadius: 12,
          background: isDarkMode ? "#1f1f1f" : "#ffffff",
          border: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
        }}
        styles={{ body: { padding: "24px" } }}>
        <Tabs
          defaultActiveKey="profile"
          tabPosition="left"
          items={tabItems}
          style={{ minHeight: 800 }}
          className="settings-tabs"/>
        <Divider />

        <div className="danger-zone" style={{ marginTop: 24 }}>
          <Card
            style={{
              border: "1px solid #ff4d4f",
              background: isDarkMode
                ? "rgba(255, 77, 79, 0.05)"
                : "rgba(255, 77, 79, 0.02)",
              borderRadius: 8,
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
              <div>
                  <Text
                    strong
                    style={{
                      display: "block",
                      color: isDarkMode ? "#ffffff" : "#000000",
                    }}
                  >
                    {GLOBAL_TEXT.LOGOUT_FROM_APPLICATION}
                  </Text>
                  <Text type="secondary">
                    {GLOBAL_TEXT.SESSION_WILL_BE_TERMINATED}
                  </Text>
                </div>
                <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                  {GLOBAL_TEXT.LOGOUT}
                </Button>
              </div>

              <Divider style={{ margin: "8px 0" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                <div>
                  <Text
                    strong
                    style={{
                      display: "block",
                      color: isDarkMode ? "#ffffff" : "#000000",
                    }}
                  >
                    {GLOBAL_TEXT.DELETE_ACCOUNT}
                  </Text>
                  <Text type="secondary">
                    {GLOBAL_TEXT.PERMANENTLY_DELETE_YOUR_ACCOUNT}
                  </Text>
                </div>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleDeleteAccount}
                >{GLOBAL_TEXT.DELETE_ACCOUNT}
                </Button>
              </div>
            </Space>
            
          </Card>
        </div>
      </Card>
    </div>
  );
};
