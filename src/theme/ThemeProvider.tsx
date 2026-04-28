import React, { useState } from 'react';
import { ConfigProvider, theme as antTheme, Button, Layout } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
          fontFamily: "'Nunito Sans', sans-serif",
          colorBgLayout: isDarkMode ? '#141414' : '#f0f2f5',
        },
        components: {
          Card: {
            colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
          }
        }
      }}
    >
      <Layout style={{ minHeight: '100vh', background: isDarkMode ? '#141414' : '#f0f2f5' }}>
        <Layout.Header style={{ 
          background: isDarkMode ? '#1f1f1f' : '#ffffff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          padding: '0 24px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#000000' }}>
            DashStack Clone
          </div>
          <Button 
            type="text" 
            icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />} 
            onClick={toggleTheme}
            size="large"
          />
        </Layout.Header>
        <Layout.Content>
          {children}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};

export default ThemeProvider;
