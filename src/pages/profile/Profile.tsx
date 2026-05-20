import React from "react";
import { Card, Avatar, Typography, Descriptions, Row, Col, Divider } from "antd";
import { UserOutlined, MailOutlined, WomanOutlined, ManOutlined } from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();

  if (!user) {
    return <div style={{ padding: "24px", textAlign: "center" }}>Loading...</div>;
  }

  const genderIcon = user.gender === "female" ? <WomanOutlined style={{ color: "#eb2f96" }} /> : <ManOutlined style={{ color: "#1890ff" }} />;

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2} style={{ color: isDarkMode ? "#ffffff" : "#000000", marginBottom: 24 }}>
        {t("USER_PROFILE")}
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: 12,
              textAlign: "center",
              background: isDarkMode ? "#1f1f1f" : "#ffffff",
              border: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Avatar
              size={120}
              src={user.image}
              icon={<UserOutlined />}
              style={{ 
                marginBottom: 16, 
                border: "4px solid var(--primary-color)",
                boxShadow: "0 0 20px rgba(0,0,0,0.1)"
              }}
            />
            <Title level={4} style={{ margin: 0, color: isDarkMode ? "#ffffff" : "#000000" }}>
              {user.firstName} {user.lastName}
            </Title>
            <Text type="secondary">@{user.username}</Text>
            
            <Divider />
            
            <div style={{ textAlign: "left" }}>
              <div style={{ marginBottom: 16 }}>
                <Text strong style={{ color: isDarkMode ? "#ffffff" : "#000000", display: "block", marginBottom: 4 }}>{t("EMAIL")}</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <MailOutlined style={{ color: "#1890ff" }} />
                  <Text ellipsis>{user.email}</Text>
                </div>
              </div>
              
              <div>
                <Text strong style={{ color: isDarkMode ? "#ffffff" : "#000000", display: "block", marginBottom: 4 }}>{t("GENDER")}</Text>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {genderIcon}
                  <Text style={{ textTransform: "capitalize" }}>{user.gender}</Text>
                </div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card
            title={<span style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>{t("DETAILED_INFORMATION")}</span>}
            style={{
              borderRadius: 12,
              background: isDarkMode ? "#1f1f1f" : "#ffffff",
              border: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Descriptions 
              bordered 
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
              labelStyle={{ 
                background: isDarkMode ? "#141414" : "#fafafa", 
                color: isDarkMode ? "#ffffff" : "#000000",
                fontWeight: 600
              }}
              contentStyle={{ 
                background: isDarkMode ? "#1f1f1f" : "#ffffff", 
                color: isDarkMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)" 
              }}
            >
              <Descriptions.Item label={t("USER_ROLE")}>
                Admin
              </Descriptions.Item>
              <Descriptions.Item label={t("USER_NAME")}>
                {user.username}
              </Descriptions.Item>
              <Descriptions.Item label={t("FIRST_NAME")}>
                {user.firstName}
              </Descriptions.Item>
              <Descriptions.Item label={t("LAST_NAME")}>
                {user.lastName}
              </Descriptions.Item>
              <Descriptions.Item label={t("EMAIL")} span={2}>
                {user.email}
              </Descriptions.Item>
              <Descriptions.Item label={t("GENDER")}>
                <span style={{ textTransform: "capitalize" }}>{user.gender}</span>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
