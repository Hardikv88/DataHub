import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Tag, Space, Rate, Flex, Divider } from 'antd';
import { ClockCircleOutlined, FireOutlined, GlobalOutlined } from '@ant-design/icons';
import type { Recipe } from '../../modals/recipe';
import { useThemeContext } from '../../theme/ThemeContext';

const { Title, Text } = Typography;

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'green';
      case 'Medium': return 'orange';
      case 'Hard': return 'red';
      default: return 'blue';
    }
  };

  return (
    <Card
      hoverable
      onClick={() => navigate(`/recipes/${recipe.id}`)}
      cover={<img alt={recipe.name} src={recipe.image} style={{ height: 200, objectFit: 'cover' }} />}
      style={{
        height: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        background: isDarkMode ? '#1f1f1f' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
      }}
      styles={{ body: { padding: '16px' } }}
    >
      <Flex justify="space-between" align="start" style={{ marginBottom: 8 }}>
        <Title level={4} style={{ margin: 0, fontSize: 18, color: isDarkMode ? '#ffffff' : '#000000' }}>
          {recipe.name}
        </Title>
        <Tag color={getDifficultyColor(recipe.difficulty)} style={{ borderRadius: 4, margin: 0 }}>
          {recipe.difficulty}
        </Tag>
      </Flex>

      <Space direction="vertical" size={4} style={{ width: '100%', marginBottom: 12 }}>
        <Space>
          <GlobalOutlined style={{ color: '#1677ff' }} />
          <Text type="secondary">{recipe.cuisine} Cuisine</Text>
        </Space>
        <Flex align="center" gap={8}>
          <Rate disabled defaultValue={recipe.rating} allowHalf style={{ fontSize: 14 }} />
          <Text type="secondary">({recipe.reviewCount})</Text>
        </Flex>
      </Space>

      <Divider style={{ margin: '12px 0' }} />

      <Flex justify="space-between" align="center">
        <Space direction="vertical" size={0}>
          <Space size={4}>
            <ClockCircleOutlined style={{ color: '#faad14' }} />
            <Text strong style={{ fontSize: 12 }}>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</Text>
          </Space>
          <Text type="secondary" style={{ fontSize: 11 }}>Prep + Cook</Text>
        </Space>

        <Space direction="vertical" size={0} align="end">
          <Space size={4}>
            <FireOutlined style={{ color: '#ff4d4f' }} />
            <Text strong style={{ fontSize: 12 }}>{recipe.caloriesPerServing} kcal</Text>
          </Space>
          <Text type="secondary" style={{ fontSize: 11 }}>Per serving</Text>
        </Space>
      </Flex>
    </Card>
  );
};

export default RecipeCard;
