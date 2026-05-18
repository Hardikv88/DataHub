import React, { useEffect, useCallback } from 'react';
import {
  Row,
  Col,
  Typography,
  Pagination,
  Skeleton,
  Empty,
  Flex
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadRecipes, setCurrentPage, setPageSize, setSearchQuery, searchAllRecipes } from './recipeSlice';
import RecipeCard from '../../components/recipes/RecipeCard';
import Input from '../../components/common/Input';
import { useThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const Recipes: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useThemeContext();
  const {
    recipes,
    loading,
    error,
    total,
    currentPage,
    pageSize,
    searchQuery
  } = useAppSelector((state) => state.recipes);

  const fetchRecipesData = useCallback(() => {
    if (searchQuery) {
      dispatch(searchAllRecipes(searchQuery));
    } else {
      const skip = (currentPage - 1) * pageSize;
      dispatch(loadRecipes({ limit: pageSize, skip }));
    }
  }, [dispatch, currentPage, pageSize, searchQuery]);

  useEffect(() => {
    fetchRecipesData();
  }, [fetchRecipesData]);

  const handlePageChange = (page: number, size?: number) => {
    dispatch(setCurrentPage(page));
    if (size && size !== pageSize) {
      dispatch(setPageSize(size));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div style={{
      minHeight: '100%',
      color: isDarkMode ? '#ffffff' : '#000000'
    }}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }} wrap="wrap" gap="middle">
        <Title level={2} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
          {t("RECIPES")}
        </Title>
        <Input
          placeholder="Search recipes..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={handleSearch}
          style={{ width: 350 }}
        />
      </Flex>

      {/* Recipes List Body */}
      {error ? (
        <div style={{ padding: '40px 0' }}>
          <Empty description={error} />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            {loading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </Col>
              ))
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => (
                <Col xs={24} sm={12} md={8} lg={6} key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty description="No recipes found" />
              </Col>
            )}
          </Row>

          {/* Pagination */}
          {!loading && recipes.length > 0 && !searchQuery && (
            <div className="products-pagination">
              <Pagination
                size="large"
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
                style={{
                  background: 'transparent',
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Recipes;
