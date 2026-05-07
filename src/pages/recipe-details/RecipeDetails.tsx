import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Row, Col, Skeleton, Result, Button, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadRecipeById, clearSelectedRecipe } from '../recipes/recipeSlice';
import RecipeHero from '../../components/recipes/RecipeHero';
import RecipeInfo from '../../components/recipes/RecipeInfo';
import IngredientsList from '../../components/recipes/IngredientsList';
import InstructionsList from '../../components/recipes/InstructionsList';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedRecipe, loading, error } = useAppSelector((state) => state.recipes);

  useEffect(() => {
    if (id) {
      dispatch(loadRecipeById(id));
    }
    return () => {
      dispatch(clearSelectedRecipe());
    };
  }, [dispatch, id]);

  if (error) {
    return (
      <div style={{ padding: '40px' }}>
        <Result
          status="error"
          title="Failed to load recipe"
          subTitle={error}
          extra={[
            <Link to="/recipes" key="back">
              <Button type="primary" icon={<ArrowLeftOutlined />}>Back to Recipes</Button>
            </Link>
          ]}
        />
      </div>
    );
  }

  return (
    <div className="recipe-details-container" style={{ padding: '24px' }}>
      {/* Breadcrumb */}
      <Breadcrumb 
        style={{ marginBottom: 24 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          { title: <Link to="/recipes">Recipes</Link> },
          { title: loading ? <Skeleton.Button active size="small" /> : selectedRecipe?.name },
        ]}
      />

      {loading ? (
        <Space direction="vertical" size={32} style={{ width: '100%' }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}><Skeleton.Image style={{ width: '100%', height: 400 }} active /></Col>
            <Col xs={24} md={12}><Skeleton active paragraph={{ rows: 8 }} /></Col>
          </Row>
          <Skeleton active paragraph={{ rows: 12 }} />
        </Space>
      ) : selectedRecipe ? (
        <>
          <RecipeHero recipe={selectedRecipe} />
          <RecipeInfo recipe={selectedRecipe} />
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={8}>
              <IngredientsList ingredients={selectedRecipe.ingredients} />
            </Col>
            <Col xs={24} lg={16}>
              <InstructionsList instructions={selectedRecipe.instructions} />
            </Col>
          </Row>
        </>
      ) : null}
    </div>
  );
};

export default RecipeDetails;
