import React from 'react';
import { Row, Col, Typography, Tag, Rate, Space, Flex } from 'antd';
import type { Recipe } from '../../modals/recipe';
import { useThemeContext } from '../../theme/ThemeContext';
import { t } from 'i18next';

const { Title, Text } = Typography;

interface RecipeHeroProps {
  recipe: Recipe;
}

const RecipeHero: React.FC<RecipeHeroProps> = ({ recipe }) => {
  const { isDarkMode } = useThemeContext();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'green';
      case 'Medium': return 'orange';
      case 'Hard': return 'red';
      default: return 'blue';
    }
  };

  return (
    <div className="recipe-hero" style={{ marginBottom: 32 }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            className="recipe-image"
            style={{ 
              width: '100%', 
              borderRadius: 16, 
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              objectFit: 'cover',
              maxHeight: 500
            }} 
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="recipe-info">
            <Space direction="vertical" size={16} style={{ width: '100%' }}>
              <div>
                <Tag color="blue" style={{ marginBottom: 8, borderRadius: 4 }}>{recipe.cuisine} Cuisine</Tag>
                <Title level={1} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
                  {recipe.name}
                </Title>
              </div>

              <Space size="large" wrap>
                <Flex align="center" gap={8}>
                  <Rate disabled defaultValue={recipe.rating} allowHalf />
                  <Text strong>({recipe.reviewCount} reviews)</Text>
                </Flex>
                <Tag color={getDifficultyColor(recipe.difficulty)} style={{ borderRadius: 4 }}>
                  {recipe.difficulty}
                </Tag>
              </Space>

              <div>
                <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>{t('MEAL_TYPES')}:</Text>
                <Space wrap>
                  {recipe.mealType.map(type => (
                    <Tag key={type} style={{ borderRadius: 4 }}>{type}</Tag>
                  ))}
                </Space>
              </div>

              <div style={{ marginTop: 8 }}>
                <Text type="secondary">{t('TAGS')}:</Text>
                <div style={{ marginTop: 4 }}>
                  <Space wrap>
                    {recipe.tags.map(tag => (
                      <Tag key={tag} color="processing" style={{ borderRadius: 4 }}>#{tag}</Tag>
                    ))}
                  </Space>
                </div>
              </div>
            </Space>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// Helper Flex for RecipeHero since it's not imported from antd in this snippet


export default RecipeHero;
