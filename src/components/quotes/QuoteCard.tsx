import React from 'react';
import { Card, Typography, Space, Flex } from 'antd';
import { 
  CheckSquareOutlined,
  UserOutlined 
} from '@ant-design/icons';
import type { Quote } from '../../services/quoteService';
import { useThemeContext } from '../../theme/ThemeContext';

const { Text } = Typography;

interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote }) => {
  const { isDarkMode } = useThemeContext();

  return (
    <Card 
      hoverable 
      style={{ 
        borderRadius: 16,
        background: isDarkMode ? '#1f1f1f' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
        height: '100%',
        boxShadow: isDarkMode ? 'none' : '0 4px 12px rgba(0,0,0,0.05)'
      }}
      styles={{ body: { padding: '24px' } }}
    >
      <Flex vertical gap="large" style={{ height: '100%' }}>
        <CheckSquareOutlined style={{ fontSize: 24, color: '#1677ff', opacity: 0.8 }} />
        
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 500,
          fontStyle: 'italic',
          color: isDarkMode ? '#e6e6e6' : '#262626',
          lineHeight: 1.6,
          flexGrow: 1
        }}>
          "{quote.quote}"
        </Text>

        <Flex justify="space-between" align="center" style={{ borderTop: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`, paddingTop: 16 }}>
          <Space size={8}>
            <UserOutlined style={{ color: '#1677ff' }} />
            <Text strong style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>{quote.author}</Text>
          </Space>
          <Text type="secondary" style={{ fontSize: 12 }}>ID: {quote.id}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default QuoteCard;
