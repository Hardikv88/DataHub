import React from 'react';
import { Card, Typography, Tag, Space, Flex, Checkbox } from 'antd';
import { 
  CheckCircleFilled, 
  ClockCircleFilled,
  UserOutlined 
} from '@ant-design/icons';
import type { Todo } from '../../services/todoService';
import { useThemeContext } from '../../theme/ThemeContext';
import { GLOBAL_TEXT } from '../../constants/Strings';

const { Text } = Typography;

interface TodoCardProps {
  todo: Todo;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const { isDarkMode } = useThemeContext();

  return (
    <Card 
      hoverable 
      style={{ 
        borderRadius: 12,
        background: isDarkMode ? '#1f1f1f' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
        height: '100%'
      }}
      styles={{ body: { padding: '20px' } }}
    >
      <Flex vertical gap="middle">
        <Flex justify="space-between" align="start">
          <Checkbox checked={todo.completed} disabled style={{ marginTop: 4 }} />
          <Tag 
            color={todo.completed ? 'success' : 'processing'} 
            icon={todo.completed ? <CheckCircleFilled /> : <ClockCircleFilled />}
            style={{ borderRadius: 12, padding: '0 12px' }}
          >
            {todo.completed ? GLOBAL_TEXT.COMPLETED : GLOBAL_TEXT.PENDING}
          </Tag>
        </Flex>

        <Text style={{ 
          fontSize: 16, 
          fontWeight: 500,
          color: isDarkMode ? '#ffffff' : '#000000',
          textDecoration: todo.completed ? 'line-through' : 'none',
          opacity: todo.completed ? 0.6 : 1,
          minHeight: 48
        }}>
          {todo.todo}
        </Text>

        <Flex justify="space-between" align="center" style={{ borderTop: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`, paddingTop: 12 }}>
          <Space size={4}>
            <UserOutlined style={{ color: '#1677ff' }} />
            <Text type="secondary">User ID: {todo.userId}</Text>
          </Space>
          <Text type="secondary" style={{ fontSize: 12 }}>#{todo.id}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default TodoCard;
