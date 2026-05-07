import React from 'react';
import { Switch, List, Button, Typography, Space, Divider, message, Modal } from 'antd';
import { GLOBAL_TEXT } from '../../constants/Strings';
import { useThemeContext } from '../../theme/ThemeContext';
import { ExclamationCircleOutlined, DownloadOutlined, ReloadOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;
const { confirm } = Modal;

const PrivacySettings: React.FC = () => {
  const { isDarkMode } = useThemeContext();

  const handleResetSessions = () => {
    confirm({
      title: 'Reset all active sessions?',
      icon: <ExclamationCircleOutlined />,
      content: 'You will be logged out from all other devices.',
      onOk() {
        message.success('All sessions have been reset.');
      },
    });
  };

  const handleDownloadData = () => {
    message.loading('Preparing your data for download...');
    setTimeout(() => {
      message.success('Your data is ready for download.');
    }, 2000);
  };

  const privacyOptions = [
    { key: '2fa', title: GLOBAL_TEXT.TWO_FACTOR_AUTH, description: 'Add an extra layer of security to your account.' },
    { key: 'visibility', title: GLOBAL_TEXT.PROFILE_VISIBILITY, description: 'Make your profile visible to other users.' },
    { key: 'tracking', title: GLOBAL_TEXT.ACTIVITY_TRACKING, description: 'Allow us to track your activity to improve experience.' },
  ];

  return (
    <div style={{ maxWidth: 600 }}>
      <List
        itemLayout="horizontal"
        dataSource={privacyOptions}
        renderItem={(item) => (
          <List.Item
            actions={[<Switch key={item.key} />]}
            style={{ borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}` }}
          >
            <List.Item.Meta
              title={<Text strong style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>{item.title}</Text>}
              description={<Text type="secondary">{item.description}</Text>}
            />
          </List.Item>
        )}
      />

      <Divider />

      <Title level={4} style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Data Management</Title>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <Button icon={<ReloadOutlined />} onClick={handleResetSessions} block>
          {GLOBAL_TEXT.RESET_SESSIONS}
        </Button>
        <Button icon={<DownloadOutlined />} onClick={handleDownloadData} block>
          {GLOBAL_TEXT.DOWNLOAD_DATA}
        </Button>
      </Space>
    </div>
  );
};

export default PrivacySettings;
