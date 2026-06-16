import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Typography, Tag, Space, Flex, Tooltip } from 'antd';
import { 
  LikeOutlined, 
  DislikeOutlined, 
  EyeOutlined, 
  TagOutlined 
} from '@ant-design/icons';
import type { Post } from '../../../modals/post';
import { useThemeContext } from '../../../theme/ThemeContext';

const { Title, Paragraph, Text } = Typography;

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { isDarkMode } = useThemeContext();
  const navigate = useNavigate();

  return (
    <Card 
      hoverable 
      onClick={() => navigate(`/posts/${post.id}`)}
      style={{ 
        height: '100%',     
        borderRadius: 12,    
        background: isDarkMode ? '#1f1f1f' : '#ffffff',    
        border: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`    
      }}
      styles={{ body: { padding: '20px', display: 'flex', flexDirection: 'column', height: '100%' } }}
    >
      <Title level={4} style={{ 
        marginTop: 0, 
        marginBottom: 12, 
        fontSize: 18,
        color: isDarkMode ? '#ffffff' : '#000000'
      }}>
        {post.title}
      </Title>

      <Paragraph 
        ellipsis={{ rows: 3 }} 
        style={{ 
          color: isDarkMode ? '#a6a6a6' : '#595959', 
          flex: 1, 
          marginBottom: 16  
        }}
      >
        {post.body}
      </Paragraph>

      <div style={{ marginBottom: 16 }}>
        <Space size={[0, 8]} wrap>
          <TagOutlined style={{ marginRight: 4, color: '#1677ff' }} />
          {(post.tags || []).map(tag => (
            <Tag key={tag} color="blue" style={{ borderRadius: 4,marginRight: 6 }}>
              {tag}
            </Tag>
          ))}
        </Space>
      </div>

      <Flex justify="space-between" align="middle" style={{ borderTop: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`, paddingTop: 12 }}>
        <Space size="middle">
          <Tooltip title="Likes">
            <Space size={4}>
              <LikeOutlined style={{ color: '#52c41a' }} />
              <Text style={{ color: isDarkMode ? '#d9d9d9' : '#000000' }}>{post.reactions?.likes || 0}</Text>
            </Space>
          </Tooltip>
          <Tooltip title="Dislikes">
            <Space size={4}>
              <DislikeOutlined style={{ color: '#ff4d4f' }} />
              <Text style={{ color: isDarkMode ? '#d9d9d9' : '#000000' }}>{post.reactions?.dislikes || 0}</Text>
            </Space>
          </Tooltip>
        </Space>
        
        <Tooltip title="Views">
          <Space size={4}>
            <EyeOutlined style={{ color: '#1677ff' }} />
            <Text style={{ color: isDarkMode ? '#d9d9d9' : '#000000' }}>{post.views || 0}</Text>
          </Space>
        </Tooltip>
      </Flex>
    </Card>
  );
};

export default PostCard;


