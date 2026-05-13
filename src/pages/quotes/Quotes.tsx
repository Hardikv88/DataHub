import React, { useEffect, useCallback } from 'react';
import {
  Row,
  Col,
  Typography,
  Pagination,
  Skeleton,
  Empty,
  Flex,
  FloatButton
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  loadQuotes,
  setCurrentPage,
  setPageSize
} from './quoteSlice';
import QuoteCard from '../../components/quotes/QuoteCard';
import AddQuoteModal from '../../components/quotes/AddQuoteModal';
import { useThemeContext } from '../../theme/ThemeContext';
import { GLOBAL_TEXT } from '../../constants/Strings';

const { Title, Text } = Typography;

const Quotes: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useThemeContext();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const {
    quotes,
    loading,
    error,
    total,
    currentPage,
    pageSize
  } = useAppSelector((state) => state.quotes);

  const fetchQuotesData = useCallback(() => {
    const skip = (currentPage - 1) * pageSize;
    dispatch(loadQuotes({ limit: pageSize, skip }));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    fetchQuotesData();
  }, [fetchQuotesData]);

  const handlePageChange = (page: number, size?: number) => {
    dispatch(setCurrentPage(page));
    if (size && size !== pageSize) {
      dispatch(setPageSize(size));
    }
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ padding: '0 2px', minHeight: '80vh', position: 'relative' }}>
      {/* Header Section */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 24 }} wrap="wrap" gap="middle">
        <div>
          <Title level={2} style={{ margin: 0, color: isDarkMode ? '#ffffff' : '#000000' }}>
            {GLOBAL_TEXT.QUOTES}
          </Title>
          <Text type="secondary">{GLOBAL_TEXT.TOTAL_QUOTES}: {total}</Text>
        </div>
        
        {/* Search Ready Structure */}
        {/* <Input 
          placeholder="Search quotes..." 
          prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
          style={{ 
            width: 300, 
            borderRadius: 8, 
            height: 40,
            background: isDarkMode ? '#1f1f1f' : '#ffffff',
            borderColor: isDarkMode ? '#434343' : '#d9d9d9'
          }}
          disabled // Ready structure but disabled for now as per requirement focus
        /> */}
      </Flex>

      {/* Quote List Section */}
      {error ? (
        <Empty description={error} style={{ marginTop: 60 }} />
      ) : (
        <>
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            {loading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </Col>
              ))
            ) : quotes.length > 0 ? (
              quotes.map((quote) => (
                <Col xs={24} sm={12} lg={8} key={quote.id}>
                  <QuoteCard quote={quote} />
                </Col>
              ))
            ) : (
              <Col span={24}>
                <Empty description="No quotes found" style={{ marginTop: 60 }} />
              </Col>
            )}
          </Row>

          {/* Pagination Section */}
          {!loading && quotes.length > 0 && (
            <Flex justify="center" style={{ marginBottom: 40 }}>
              <Pagination
                size="large"
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </Flex>
          )}
        </>
      )}

      {/* Add Quote Modal */}
      <AddQuoteModal 
        visible={isModalVisible} 
        onCancel={() => setIsModalVisible(false)} 
      />

      {/* Add Quote Floating Button */}
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24, width: 56, height: 56 }}
        tooltip={<div>Add Quote</div>}
        onClick={() => setIsModalVisible(true)}
      />
    </div>
  );
};


export default Quotes;
