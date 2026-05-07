import React from 'react';
import { Card, Typography, List, Checkbox } from 'antd';
import { useThemeContext } from '../../theme/ThemeContext';

const { Title } = Typography;

interface IngredientsListProps {
  ingredients: string[];
}

const IngredientsList: React.FC<IngredientsListProps> = ({ ingredients }) => {
  const { isDarkMode } = useThemeContext();

  return (
    <Card 
      className="ingredients-section"
      title={<Title level={3} style={{ margin: 0 }}>Ingredients</Title>}
      style={{ 
        borderRadius: 12, 
        height: '100%',
        background: isDarkMode ? '#1f1f1f' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`
      }}
    >
      <List
        dataSource={ingredients}
        renderItem={(item) => (
          <List.Item style={{ border: 'none', padding: '8px 0' }}>
            <Checkbox style={{ fontSize: 16 }}>{item}</Checkbox>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default IngredientsList;
