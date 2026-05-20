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
  const isRtl = i18n.language === 'ar';

  const languages = [
    {
      key: "en",
      name: "English",
      nativeName: "English",
      code: "EN",
      description: "Standard English (US)",
    },
    {
      key: "hi",
      name: "Hindi",
      nativeName: "हिन्दी",
      code: "HI",
      description: "भारतीय हिंदी",
    },
    {
      key: "ar",
      name: "Arabic",
      nativeName: "العربية",
      code: "AR",
      description: "اللغة العربية الفصحى",
    },
  ];

  const handleLanguageChange = (key: string) => {
    i18n.changeLanguage(key);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={4} style={{ color: isDarkMode ? "#ffffff" : "#000000", margin: 0, fontWeight: 700 }}>
          {t("LANGUAGE")}
        </Title>
        <Text type="secondary" style={{ fontSize: 14 }}>
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
                  borderRadius: 16,
                  border: `2px solid ${isSelected ? Colors.primary : "transparent"}`,
                  background: isDarkMode 
                    ? (isSelected ? "rgba(72, 128, 255, 0.12)" : "#1f1f1f") 
                    : (isSelected ? "rgba(72, 128, 255, 0.08)" : "#ffffff"),
                  boxShadow: isSelected 
                    ? `0 8px 20px ${Colors.primary}20` 
                    : "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden"
                }}
                styles={{ body: { padding: "24px" } }}
              >
                {isSelected && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: isRtl ? "auto" : 0,
                    left: isRtl ? 0 : "auto",
                    width: 40,
                    height: 40,
                    background: Colors.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderBottomLeftRadius: isRtl ? 0 : 16,
                    borderBottomRightRadius: isRtl ? 16 : 0,
                    color: "#ffffff",
                    fontSize: 18,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  }}>
                    <CheckCircleFilled />
                  </div>
                )}
                
                <Space size={20} align="center">
                  <div style={{ 
                    width: 56, 
                    height: 56, 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    background: isSelected 
                      ? Colors.primary 
                      : isDarkMode ? "#2d2d2d" : "#f5f5f5",
                    color: isSelected ? "#ffffff" : isDarkMode ? "#a0a0a0" : "#666666",
                    borderRadius: "50%",
                    fontSize: 16,
                    fontWeight: 800,
                    transition: "all 0.3s ease",
                    boxShadow: isSelected ? `0 4px 12px ${Colors.primary}40` : "none"
                  }}>
                    {lang.code}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <Title level={5} style={{ 
                      margin: 0, 
                      color: isDarkMode ? "#ffffff" : "#000000",
                      fontSize: 18,
                      fontWeight: 600
                    }}>
                      {lang.nativeName}
                    </Title>
                    <Text style={{ 
                      fontSize: 14, 
                      display: "block", 
                      marginTop: 2,
                      color: isDarkMode ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"
                    }}>
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
