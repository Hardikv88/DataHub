import React from "react";
import { Row, Col, Typography, Card, Space } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";
import { Colors } from "../../theme/colors";

const { Text, Title } = Typography;

const LanguageSettings: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { isDarkMode } = useThemeContext();

  const currentLang = i18n.language.split("-")[0];

  const languages = [
    {
      key: "en",
      name: "English",
      nativeName: "English",
      flag: "🇺🇸",
      description: "Standard English (US)",
    },
    {
      key: "hi",
      name: "Hindi",
      nativeName: "हिन्दी",
      flag: "🇮🇳",
      description: "भारतीय हिंदी",
    },
  ];

  const handleLanguageChange = (key: string) => {
    i18n.changeLanguage(key);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ color: isDarkMode ? "#ffffff" : "#000000", margin: 0 }}>
          {t("LANGUAGE")}
        </Title>
        <Text type="secondary">
          {t("CHOOSE_PREFERRED_LANGUAGE")}
        </Text>
      </div>

      <Row gutter={[16, 16]}>
        {languages.map((lang) => {
          const isSelected = currentLang === lang.key;
          return (
            <Col xs={24} sm={12} key={lang.key}>
              <Card
                hoverable
                onClick={() => handleLanguageChange(lang.key)}
                style={{
                  borderRadius: 12,
                  border: `2px solid ${isSelected ? Colors.primary : isDarkMode ? "#303030" : "#f0f0f0"}`,
                  background: isDarkMode ? (isSelected ? "rgba(72, 128, 255, 0.1)" : "#1f1f1f") : (isSelected ? "rgba(72, 128, 255, 0.05)" : "#ffffff"),
                  transition: "all 0.3s ease",
                  position: "relative",
                  overflow: "hidden"
                }}
                styles={{ body: { padding: "20px" } }}
              >
                {isSelected && (
                  <div style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    color: Colors.primary,
                    fontSize: 20
                  }}>
                    <CheckCircleFilled />
                  </div>
                )}
                
                <Space size={16} align="start">
                  <div style={{ 
                    fontSize: 40, 
                    width: 60, 
                    height: 60, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    background: isDarkMode ? "#141414" : "#f5f5f5",
                    borderRadius: 12,
                    lineHeight: 1
                  }}>
                    {lang.flag}
                  </div>
                  
                  <div style={{ paddingTop: 4 }}>
                    <Title level={5} style={{ margin: 0, color: isDarkMode ? "#ffffff" : "#000000" }}>
                      {lang.nativeName}
                    </Title>
                    <Text type="secondary" style={{ fontSize: 13, display: "block", marginTop: 4 }}>
                      {lang.name} • {lang.description}
                    </Text>
                  </div>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      <div style={{ 
        marginTop: 32, 
        padding: "16px 20px", 
        borderRadius: 12, 
        background: isDarkMode ? "rgba(72, 128, 255, 0.05)" : "#f0f5ff",
        border: `1px dashed ${Colors.primary}40`,
        display: "flex",
        alignItems: "center",
        gap: 12
      }}>
        <div style={{ 
          width: 8, 
          height: 8, 
          borderRadius: "50%", 
          background: Colors.primary,
          boxShadow: `0 0 10px ${Colors.primary}`
        }} />
        <Text style={{ fontSize: 14, color: isDarkMode ? "rgba(255,255,255,0.85)" : "#1d39c4" }}>
          {t("LANGUAGE_AUTO_SAVE_NOTICE")}
        </Text>
      </div>
    </div>
  );
};

export default LanguageSettings;
