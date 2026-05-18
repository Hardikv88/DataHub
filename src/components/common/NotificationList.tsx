import React from "react";
import { List, Avatar, Typography, Badge, Button, Space, Divider } from "antd";
import {
  BellOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  ClockCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  date: string;
  isRead: boolean;
  type: "info" | "success" | "warning" | "error";
}

const getMockNotifications = (): NotificationItem[] => [
  {
    id: "1",
    title: "NOTIFICATION_ORDER_SUCCESSFUL",
    description: "NOTIFICATION_ORDER_SUCCESSFUL_DESC",
    time: "10:30 AM",
    date: "2026-05-15",
    isRead: false,
    type: "success",
  },
  {
    id: "2",
    title: "NOTIFICATION_NEW_MESSAGE",
    description: "NOTIFICATION_NEW_MESSAGE_DESC",
    time: "09:15 AM",
    date: "2026-05-15",
    isRead: false,
    type: "info",
  },
];

export const NotificationList: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();
  const mockNotifications = getMockNotifications();

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      case "warning":
        return <WarningOutlined style={{ color: "#faad14" }} />;
      case "error":
        return <InfoCircleOutlined style={{ color: "#ff4d4f" }} />;
      default:
        return <InfoCircleOutlined style={{ color: "#1890ff" }} />;
    }
  };

  return (
    <div
      className="notification-container"
      style={{
        width: "350px",
        maxWidth: "90vw",
        background: isDarkMode ? "#1f1f1f" : "#ffffff",
      }}
    >
      <div
        style={{
          padding: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
        }}
      >
        <Title level={5} style={{ margin: 0, color: isDarkMode ? "#ffffff" : "#000000" }}>
          {t("NOTIFICATIONS")}
        </Title>
        <Button type="link" size="small" style={{ padding: 0 }}>
          {t("MARK_ALL_AS_READ")}
        </Button>
      </div>

      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          padding: "0 8px",
        }}
        className="custom-scrollbar"
      >
        <List
          itemLayout="horizontal"
          dataSource={mockNotifications}
          renderItem={(item) => (
            <List.Item
              style={{
                padding: "12px 8px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s",
                background: !item.isRead
                  ? isDarkMode
                    ? "rgba(24, 144, 255, 0.1)"
                    : "rgba(24, 144, 255, 0.05)"
                  : "transparent",
                borderBottom: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
                marginBottom: "4px",
              }}
              className="notification-item"
            >
              <List.Item.Meta
                avatar={
                  <Badge dot={!item.isRead} offset={[-2, 32]} color="blue">
                    <Avatar
                      icon={getIcon(item.type)}
                      style={{
                        background: isDarkMode ? "#141414" : "#f5f5f5",
                        border: `1px solid ${isDarkMode ? "#303030" : "#d9d9d9"}`,
                      }}
                    />
                  </Badge>
                }
                title={
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Text strong style={{ color: isDarkMode ? "#ffffff" : "#000000", fontSize: "14px" }}>
                      {t(item.title)}
                    </Text>
                    {!item.isRead && (
                      <CheckOutlined style={{ fontSize: "12px", color: "#1890ff" }} />
                    )}
                  </div>
                }
                description={
                  <div style={{ marginTop: "4px" }}>
                    <Text
                      type="secondary"
                      style={{
                        fontSize: "12px",
                        display: "block",
                        marginBottom: "4px",
                        color: isDarkMode ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.45)",
                      }}
                    >
                      {t(item.description)}
                    </Text>
                    <Space size="small" style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                      <ClockCircleOutlined style={{ fontSize: "10px" }} />
                      <span>{item.time}</span>
                      <Divider type="vertical" />
                      <span>{item.date}</span>
                    </Space>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>

      <div
        style={{
          padding: "12px",
          textAlign: "center",
          borderTop: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
        }}
      >
        <Button type="text" block style={{ color: "#1890ff" }}>
          {t("VIEW_ALL_NOTIFICATIONS")}
        </Button>
      </div>
    </div>
  );
};
