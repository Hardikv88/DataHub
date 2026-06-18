import React, { useEffect, useCallback, useState } from 'react';
import { 
  Row, 
  Col, 
  Typography, 
  Pagination, 
  Skeleton, 
  Empty, 
  Flex
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadPosts, setCurrentPage, setPageSize, setSearchQuery, searchAllPosts } from './postSlice';
import PostCard from './components/PostCard';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import CreatePostModal from './components/CreatePostModal';

const { Title } = Typography;

const Posts: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useThemeContext();
  const [modalVisible, setModalVisible] = useState(false);
  const { 
    posts = [], 
    loading, 
    error, 
    pagination,
    currentPage, 
    pageSize, 
    searchQuery 
  } = useAppSelector((state) => state.posts);

  const fetchPostsData = useCallback(() => {
    if (searchQuery) {
      dispatch(searchAllPosts(searchQuery));
    } else {
      dispatch(loadPosts({ page: currentPage, limit: pageSize }));
    }
  }, [dispatch, currentPage, pageSize, searchQuery]);

  useEffect(() => {
    // Reset currentPage to 1 when component mounts
    dispatch(setCurrentPage(1));
  }, [dispatch]);

  useEffect(() => {
    fetchPostsData();
  }, [fetchPostsData]);

  const handlePageChange = (page: number, size?: number) => {
    dispatch(setCurrentPage(page));
    if (size && size !== pageSize) {
      dispatch(setPageSize(size));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleAddPost = () => {
    setModalVisible(true);
  };

  return (
    <div style={{ 
      minHeight: '100%',
    }}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }} wrap="wrap" gap="middle">
        <Title level={2} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
          {t("POSTS")}
        </Title>
        <Flex gap="middle" align="center">
          <Input 
            placeholder="Search posts..." 
            prefix={<SearchOutlined />} 
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: 350, marginTop: 16 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddPost}
            height={40}
            width={140}
          >
            {t("ADD_POST")}
          </Button>
        </Flex>
      </Flex>
    

      {/* Posts List Body */}
      {error ? (
        <div style={{ padding: '40px 0' }}>
          <Empty description={error} />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            {loading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <Col xs={24} sm={12} md={8} lg={8} key={index}>
                  <Skeleton active paragraph={{ rows: 4 }} />
                </Col>
              ))
            ) : posts.length > 0 ? (
              posts.map((post) => (
                <Col xs={24} sm={12} md={8} lg={8} key={post.id}>
                  <PostCard post={post} />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty description="No posts found" />
              </Col>
            )}
          </Row>
      {!loading && posts.length > 0 && !searchQuery && (
             <div className="products-pagination">
              <Pagination
                size="large"
                current={currentPage}
                pageSize={pageSize}
                total={pagination.totalItems}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </>
      )}

      <CreatePostModal 
        visible={modalVisible} 
        onCancel={() => setModalVisible(false)} 
      />
    </div>
  );
};

export default Posts;
