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
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loadTodos,
  setCurrentPage,
  setPageSize
} from './todoSlice';
import TodoCard from '../../components/todos/TodoCard';
import Button from '../../components/common/Button';
import { useThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Todos: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useThemeContext();
  const {
    todos,
    loading,
    error,
    total,
    currentPage,
    pageSize
  } = useAppSelector((state) => state.todos);

  const fetchTodosData = useCallback(() => {
    const skip = (currentPage - 1) * pageSize;
    dispatch(loadTodos({ limit: pageSize, skip }));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    fetchTodosData();
  }, [fetchTodosData]);

  const handlePageChange = (page: number, size?: number) => {
    dispatch(setCurrentPage(page));
    if (size && size !== pageSize) {
      dispatch(setPageSize(size));
    }
  };

  return (
    <div style={{ padding: '0 2px' }}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }} wrap="wrap" gap="middle">
        <div>
          <Title level={2} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
            {t("TODOS")}
          </Title>
          <Text type="secondary">{t("TOTAL_TODOS")}: {total}</Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          height={40}
          width={140}
        >
          {t("ADD_TODO")}
        </Button>
      </Flex>

      {/* Todo List Section */}
      {error ? (
        <Empty description={error} style={{ marginTop: 60 }} />
      ) : (
        <>
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            {loading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Skeleton active avatar paragraph={{ rows: 3 }} />
                </Col>
              ))
            ) : todos.length > 0 ? (
              todos.map((todo) => (
                <Col xs={24} sm={12} lg={8} key={todo.id}>
                  <TodoCard todo={todo} />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty description="No todos found" style={{ marginTop: 60 }} />
              </Col>
            )}
          </Row>

          {/* Pagination Section */}
          {!loading && todos.length > 0 && (
            <div className="products-pagination">
              <Pagination
                size="large"
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Todos;
