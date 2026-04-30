import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Typography,
  Tag,
  Space,
  Skeleton,
  Button,
  Row,
  Col,
  Result,
  Divider,
  Flex,
} from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  EyeOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadPostById, clearSelectedPost } from "./postSlice";
import { useThemeContext } from "../../theme/ThemeContext";
import { message } from "antd";

const { Title, Paragraph, Text } = Typography;

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useThemeContext();

  const { selectedPost, loading, error } = useAppSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    if (id) {
      dispatch(loadPostById(id));
    }
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, id]);

  const handleCopy = () => {
    if (selectedPost) {
      navigator.clipboard.writeText(selectedPost.body);
      message.success("Post content copied to clipboard!");
    }
  };

  if (error) {
    return (
      <Result
        status="error"
        title="Failed to Load Post"
        subTitle={error}
        extra={[
          <Button type="primary" key="back" onClick={() => navigate("/posts")}>
            Back to Posts
          </Button>,
          <Button key="retry" onClick={() => id && dispatch(loadPostById(id))}>
            Retry
          </Button>,
        ]}
      />
    );
  }

  return (
    <div style={{ marginTop: 24 }}>
      {/* Breadcrumb */}
      <Breadcrumb
        style={{ marginBottom: 28 }}
        items={[
          { title: <Link to="/dashboard">Home</Link> },
          { title: <Link to="/posts">Posts</Link> },
          { title: "Post Details" },
        ]}
      />

      

      {loading ? (
        <Card style={{ borderRadius: 12 }}>
          <Skeleton active paragraph={{ rows: 10 }} />
        </Card>
      ) : selectedPost ? (
        <Card
          style={{
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            background: isDarkMode ? "#1f1f1f" : "#ffffff",
          }}
        >
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Flex justify="space-between" align="start">
                <Title level={3} style={{ marginTop: 0 }}>
                  {selectedPost.title}
                </Title>
                <Button
                  icon={<CopyOutlined />}
                  onClick={handleCopy}
                  type="text"
                />
              </Flex>
              <Text type="secondary" style={{ fontSize: 12 }}>
                Post ID: {selectedPost.id}
              </Text>

              <div style={{ marginTop: 12 }}>
                {selectedPost.tags.map((tag) => (
                  <Tag key={tag} color="blue" style={{ borderRadius: 4 }}>
                    {tag}
                  </Tag>
                ))}
              </div>

              <Divider />

              <Paragraph style={{ fontSize: 16, lineHeight: 1.8 }}>
                {selectedPost.body}
              </Paragraph>

              <Divider />

              <Row gutter={32}>
                <Col>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      AUTHOR ID
                    </Text>
                    <Text strong>{selectedPost.userId}</Text>
                  </Space>
                </Col>
                <Col>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      LIKES
                    </Text>
                    <Space>
                      <LikeOutlined style={{ color: "#52c41a" }} />
                      <Text strong>{selectedPost.reactions?.likes || 0}</Text>
                    </Space>
                  </Space>
                </Col>
                <Col>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      DISLIKES
                    </Text>
                    <Space>
                      <DislikeOutlined style={{ color: "#ff4d4f" }} />
                      <Text strong>{selectedPost.reactions?.dislikes || 0}</Text>
                    </Space>
                  </Space>
                </Col>
                <Col>
                  <Space direction="vertical" size={4}>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      VIEWS
                    </Text>
                    <Space>
                      <EyeOutlined style={{ color: "#1677ff" }} />
                      <Text strong>{selectedPost.views || 0}</Text>
                    </Space>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      ) : (
        <Result
          status="404"
          title="Post Not Found"
          extra={
            <Button type="primary" onClick={() => navigate("/posts")}>
              Back to Posts
            </Button>
          }
        />
      )}
    </div>
  );
};

export default PostDetails;
