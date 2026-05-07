import React from 'react';
import { Row, Col, Card, Typography, Space } from 'antd';
import { ClockCircleOutlined, UserOutlined, FireOutlined } from '@ant-design/icons';
import type { Recipe } from '../../modals/recipe';
import { useThemeContext } from '../../theme/ThemeContext';

const { Text, Title } = Typography;

interface RecipeInfoProps {
  recipe: Recipe;
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipe }) => {
  const { isDarkMode } = useThemeContext();

  const infoItems = [
    {
      title: 'Prep Time',
      value: `${recipe.prepTimeMinutes} min`,
      icon: <ClockCircleOutlined style={{ color: '#faad14', fontSize: 24 }} />,
    },
    {
      title: 'Cook Time',
      value: `${recipe.cookTimeMinutes} min`,
      icon: <ClockCircleOutlined style={{ color: '#ff4d4f', fontSize: 24 }} />,
    },
    {
      title: 'Servings',
      value: recipe.servings,
      icon: <UserOutlined style={{ color: '#1677ff', fontSize: 24 }} />,
    },
    {
      title: 'Calories',
      value: `${recipe.caloriesPerServing} kcal`,
      icon: <FireOutlined style={{ color: '#52c41a', fontSize: 24 }} />,
    },
  ];

  return (
    <div className="recipe-stats" style={{ marginBottom: 32 }}>
      <Row gutter={[16, 16]}>
        {infoItems.map((item, index) => (
          <Col xs={12} sm={6} key={index}>
            <Card 
              style={{ 
                borderRadius: 12, 
                textAlign: 'center',
                background: isDarkMode ? '#1f1f1f' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
              }}
              styles={{ body: { padding: '16px' } }}
            >
              <Space direction="vertical" size={4}>
                {item.icon}
                <Text type="secondary" style={{ fontSize: 12 }}>{item.title}</Text>
                <Title level={4} style={{ margin: 0, fontSize: 16 }}>{item.value}</Title>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RecipeInfo;
