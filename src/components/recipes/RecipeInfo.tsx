import React from 'react';
import { Card, Row, Col, Typography, Space } from 'antd';
import { 
  ClockCircleOutlined, 
  FireOutlined, 
  UserOutlined, 
  FieldTimeOutlined 
} from '@ant-design/icons';
import type { Recipe } from '../../modals/recipe';
import { useThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface RecipeInfoProps {
  recipe: Recipe;
}

const RecipeInfo: React.FC<RecipeInfoProps> = ({ recipe }) => {
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();

  const infoItems = [
    {
      icon: <ClockCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />,
      label: t('PREP_TIME'),
      value: `${recipe.prepTimeMinutes} ${t('MINS')}`,
    },
    {
      icon: <FieldTimeOutlined style={{ fontSize: 24, color: '#52c41a' }} />,
      label: t('COOK_TIME'),
      value: `${recipe.cookTimeMinutes} ${t('MINS')}`,
    },
    {
      icon: <UserOutlined style={{ fontSize: 24, color: '#eb2f96' }} />,
      label: t('SERVINGS'),
      value: recipe.servings,
    },
    {
      icon: <FireOutlined style={{ fontSize: 24, color: '#faad14' }} />,
      label: t('CALORIES'),
      value: `${recipe.caloriesPerServing} ${t('KCAL')}`,
    },
  ];

  return (
    <Card 
      style={{ 
        marginBottom: 32, 
        borderRadius: 16,
        background: isDarkMode ? '#1f1f1f' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
      }}
    >
      <Row gutter={[16, 16]} justify="space-around" align="middle">
        {infoItems.map((item, index) => (
          <Col xs={12} sm={6} key={index}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              {item.icon}
              <Text type="secondary" style={{ fontSize: 12 }}>{item.label}</Text>
              <Text strong style={{ fontSize: 18, color: isDarkMode ? '#ffffff' : '#000000' }}>
                {item.value}
              </Text>
            </Space>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default RecipeInfo;
