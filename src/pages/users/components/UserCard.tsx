import React from "react";
import { Card, Avatar, Typography, Tag, Flex } from "antd";

import { useNavigate } from "react-router-dom";
import type { User } from "../../../modals/user";

const { Title, Text } = Typography;

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();
  console.log('UserCard user:', user);

  const getRoleColor = (role: string) => {
    const lowerRole = role?.toLowerCase() || '';
    switch (lowerRole) {
      case "admin":
        return "red";
      case "moderator":
        return "geekblue";
      default:
        return "green";
    }
  };

  const userId = user.userId || user.id;
  const userName = user.userName || user.name || 'Unknown User';
  const userEmail = user.userEmail || user.email || 'no-email@example.com';
  const userRole = user.userRole || user.role || 'user';
  const userImage = user.profileImage || user.image;

  return (
    <Card
      hoverable
      onClick={() => navigate(`/users/${userId}`)}
      style={{ borderRadius: 12, overflow: "hidden" }}
      styles={{ body: { padding: "24px", textAlign: "center" } }}
    >
      <Flex vertical gap="middle" align="center">
        <Avatar
          src={userImage}
          size={80}
          style={{ backgroundColor: "#f0f2f5", }}
        />

        <div>
          <Title
            level={5}
            style={{
              margin: 0,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {userName}
          </Title>
          <Text
            type="secondary"
            style={{
              display: "block",
              fontSize: 13,
              marginBottom: 8,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {userEmail}
          </Text>
          <Tag
            color={getRoleColor(userRole)}
            style={{ margin: 0, textTransform: "capitalize" }}
          >
            {userRole}
          </Tag>
        </div>
      </Flex>
    </Card>
  );
};

export default UserCard;
