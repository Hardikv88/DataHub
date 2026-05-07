import React from 'react';
import { Form, Switch, List, Button, message, Typography } from 'antd';
import { GLOBAL_TEXT } from '../../constants/Strings';
import { useThemeContext } from '../../theme/ThemeContext';

const { Text } = Typography;

const NotificationSettings: React.FC = () => {
  const { isDarkMode } = useThemeContext();

  const settings = [
    { key: 'email', title: GLOBAL_TEXT.EMAIL_NOTIFICATIONS, description: 'Receive emails about account activity.' },
    { key: 'push', title: GLOBAL_TEXT.PUSH_NOTIFICATIONS, description: 'Receive push notifications on your devices.' },
    { key: 'marketing', title: GLOBAL_TEXT.MARKETING_EMAILS, description: 'Receive emails about new features and offers.' },
    { key: 'orders', title: GLOBAL_TEXT.ORDER_UPDATES, description: 'Receive updates about your order status.' },
    { key: 'security', title: GLOBAL_TEXT.SECURITY_ALERTS, description: 'Receive alerts about your account security.' },
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
          {GLOBAL_TEXT.SAVE_CHANGES}
        </Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
