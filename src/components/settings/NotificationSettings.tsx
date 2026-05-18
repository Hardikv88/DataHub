import React from 'react';
import { List, Switch, Typography, Button, message } from 'antd';
import { useThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

const NotificationSettings: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();

  const settings = [
    { key: 'email', title: t("EMAIL_NOTIFICATIONS"), description: 'Receive emails about account activity.' },
    { key: 'push', title: t("PUSH_NOTIFICATIONS"), description: 'Receive push notifications on your devices.' },
    { key: 'marketing', title: t("MARKETING_EMAILS"), description: 'Receive emails about new features and offers.' },
    { key: 'orders', title: t("ORDER_UPDATES"), description: 'Receive updates about your order status.' },
    { key: 'security', title: t("SECURITY_ALERTS"), description: 'Receive alerts about your account security.' },
  ];

  const handleSave = () => {
    message.success('Notification preferences saved!');
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <List
        itemLayout="horizontal"
        dataSource={settings}
        renderItem={(item) => (
          <List.Item
            actions={[<Switch key={item.key} defaultChecked />]}
            style={{ borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}` }}
          >
            <List.Item.Meta
              title={<Text strong style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>{item.title}</Text>}
              description={<Text type="secondary">{item.description}</Text>}
            />
          </List.Item>
        )}
      />
      <div style={{ marginTop: 24 }}>
        <Button type="primary" onClick={handleSave}>
          {t("SAVE_CHANGES")}
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
