import React from 'react';
import { Card, Typography, List, Space } from 'antd';
import { useThemeContext } from '../../theme/ThemeContext';
import { GLOBAL_TEXT } from '../../constants/Strings';

const { Title, Paragraph } = Typography;

interface InstructionsListProps {
  instructions: string[];
}

const InstructionsList: React.FC<InstructionsListProps> = ({ instructions }) => {
  const { isDarkMode } = useThemeContext();

  return (
    <Card 
      className="instructions-section"
      title={<Title level={3} style={{ margin: 0 }}>{GLOBAL_TEXT.INSTRUCTIONS}</Title>}
      style={{ 
        borderRadius: 12,
        background: isDarkMode ? '#1f1f1f' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
      }}
    >
      <List
        dataSource={instructions}
        renderItem={(item, index) => (
          <List.Item style={{ borderBottom: index === instructions.length - 1 ? 'none' : `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`, padding: '20px 0' }}>
            <Space align="start" size={16}>
              <div style={{ 
                width: 32, 
                height: 32, 
                borderRadius: '50%', 
                background: '#1677ff', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0,
                fontWeight: 'bold'
              }}>
                {index + 1}
              </div>
              <Paragraph style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>
                {item}
              </Paragraph>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default InstructionsList;
