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
import { GLOBAL_TEXT } from "../../constants/Strings";
import { useThemeContext } from "../../theme/ThemeContext";

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

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Order Successful",
    description: "Your order #12345 has been placed successfully.",
    time: "10:30 AM",
    date: "2026-05-15",
    isRead: false,
    type: "success",
  },
  {
    id: "2",
    title: "New Message",
    description: "You have received a new message from Admin.",
    time: "09:15 AM",
    date: "2026-05-15",
    isRead: false,
    type: "info",
  },
  {
    id: "3",
    title: "System Update",
    description: "Scheduled maintenance will occur at 12:00 AM.",
    time: "08:00 PM",
    date: "2026-05-14",
    isRead: true,
    type: "warning",
  },
  {
    id: "4",
    title: "Payment Failed",
    description: "Your payment for order #12344 was declined.",
    time: "05:45 PM",
    date: "2026-05-14",
    isRead: true,
    type: "error",
  },
  {
    id: "5",
    title: "Profile Updated",
    description: "Your profile information has been updated successfully.",
    time: "02:20 PM",
    date: "2026-05-13",
    isRead: true,
    type: "success",
  },
];

export const NotificationList: React.FC = () => {
  const { isDarkMode } = useThemeContext();

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
          {GLOBAL_TEXT.NOTIFICATIONS}
        </Title>
        <Button type="link" size="small" style={{ padding: 0 }}>
          {GLOBAL_TEXT.MARK_ALL_AS_READ}
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
                      {item.title}
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
                      {item.description}
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
          {GLOBAL_TEXT.VIEW_ALL_NOTIFICATIONS}
        </Button>
      </div>
    </div>
  );
};
