import React from 'react';
import { Radio, Typography, Space, Flex, Row, Col } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';
import { GLOBAL_TEXT } from '../../constants/Strings';
import { useThemeContext } from '../../theme/ThemeContext';

const { Text } = Typography;

const ThemeSettings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <div style={{ maxWidth: 600 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
            Select your preferred application theme. Changes will be applied immediately.
          </Text>
          
          <Radio.Group 
            value={isDarkMode ? 'dark' : 'light'} 
            onChange={(e) => {
              const val = e.target.value;
              if ((val === 'dark' && !isDarkMode) || (val === 'light' && isDarkMode)) {
                toggleTheme();
              }
            }}
            style={{ width: '100%' }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Radio.Button value="light" style={{ width: '100%', height: 'auto', padding: '12px 16px', borderRadius: 8 }}>
                  <Flex align="center" gap={12}>
                    <BulbOutlined style={{ fontSize: 20 }} />
                    <div>
                      <Text strong style={{ display: 'block' }}>{GLOBAL_TEXT.LIGHT_MODE}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>Classic light appearance</Text>
                    </div>
                  </Flex>
                </Radio.Button>
              </Col>
              <Col span={12}>
                <Radio.Button value="dark" style={{ width: '100%', height: 'auto', padding: '12px 16px', borderRadius: 8 }}>
                  <Flex align="center" gap={12}>
                    <BulbFilled style={{ fontSize: 20 }} />
                    <div>
                      <Text strong style={{ display: 'block' }}>{GLOBAL_TEXT.DARK_MODE}</Text>
                      <Text type="secondary" style={{ fontSize: 12 }}>Modern dark appearance</Text>
                    </div>
                  </Flex>
                </Radio.Button>
              </Col>
            </Row>
          </Radio.Group>
        </div>
      </Space>
    </div>
  );
};

export default ThemeSettings;
