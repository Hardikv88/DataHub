import React from "react";
import { Radio, Space, Typography, Card } from "antd";
import { useTranslation } from "react-i18next";
import { useThemeContext } from "../../theme/ThemeContext";

const { Text, Title } = Typography;

const LanguageSettings: React.FC = () => {
  const { i18n, t } = useTranslation();
  const { isDarkMode } = useThemeContext();

  const changeLanguage = (e: any) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div style={{ padding: "16px 0" }}>
      <Title level={4} style={{ color: isDarkMode ? "#ffffff" : "#000000", marginBottom: 24 }}>
        {t("LANGUAGE")}
      </Title>
      
      <Card
        style={{
          background: isDarkMode ? "#141414" : "#fafafa",
          border: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
          borderRadius: 8,
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <div>
            <Text strong style={{ display: "block", color: isDarkMode ? "#ffffff" : "#000000", marginBottom: 8 }}>
              Select Language
            </Text>
            <Text type="secondary" style={{ display: "block", marginBottom: 16 }}>
              Choose your preferred language for the application interface.
            </Text>
            
            <Radio.Group 
              onChange={changeLanguage} 
              value={i18n.language.split('-')[0]} // Handle cases like 'en-US'
              optionType="button"
              buttonStyle="solid"
            >
              <Radio.Button value="en">English</Radio.Button>
              <Radio.Button value="hi">Hindi (हिन्दी)</Radio.Button>
            </Radio.Group>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default LanguageSettings;
