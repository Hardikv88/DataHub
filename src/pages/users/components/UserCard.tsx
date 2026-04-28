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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "red";
      case "moderator":
        return "geekblue";
      default:
        return "green";
    }
  };

  return (
    <Card
      hoverable
      onClick={() => navigate(`/users/${user.id}`)}
      style={{ borderRadius: 12, overflow: "hidden" }}
      styles={{ body: { padding: "24px", textAlign: "center" } }}
    >
      <Flex vertical gap="middle" align="center">
        <Avatar
          src={user.image}
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
            {user.firstName} {user.lastName}
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
            {user.email}
          </Text>
          <Tag
            color={getRoleColor(user.role)}
            style={{ margin: 0, textTransform: "capitalize" }}
          >
            {user.role}
          </Tag>
        </div>
      </Flex>
    </Card>
  );
};

export default UserCard;
