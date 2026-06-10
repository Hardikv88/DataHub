import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Card,
  Descriptions,
  Avatar,
  Tag,
  Typography,
  Skeleton,
  Button,
  Result,
  Row,
  Col,
  Space,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadUserById, clearCurrentUser } from "./userSlice";
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const UserDetails: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector(
    (state) => state.users,
  );

  useEffect(() => {
    if (id) {
      dispatch(loadUserById(id));
    }
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [id, dispatch]);

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

  if (loading) {
    return (
      <div style={{ padding: "24px", maxWidth: 1000, margin: "0 auto" }}>
        <Skeleton active avatar paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (error || !currentUser) {
    return (
      <Result
        status="error"
        title="User Not Found"
        subTitle={error || "The user you are looking for does not exist."}
        extra={
          <Button type="primary" onClick={() => navigate("/users")}>
            Back to Users
          </Button>
        }
      />
    );
  }

  const userName = currentUser.userName || currentUser.name || 'Unknown User';
  const userEmail = currentUser.userEmail || currentUser.email || 'no-email@example.com';
  const userRole = currentUser.userRole || currentUser.role || 'user';
  const userImage = currentUser.profileImage || currentUser.image;
  const createdAt = currentUser.created_at || '';
  const updatedAt = currentUser.updated_at || '';


  return (
    <div className="product-details-container">
      <div className="breadcrumb-wrapper">
        <Breadcrumb
          items={[
            { title: <Link to="/dashboard">Home</Link> },
            { title: <Link to="/users">Users</Link> },
            { title: userName },
          ]}
        />
      </div>

      {/* Top Section */}
      <Card bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
        <Row align="middle" gutter={24}>
          <Col>
            <Avatar
              src={userImage}
              size={100}
              style={{ backgroundColor: "#f0f2f5" }}
            />
          </Col>
          <Col flex="auto">
            <Title level={3} style={{ margin: 0 }}>
              {userName}
            </Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 8 }}
            >
              @{userEmail}
            </Text>
            <Space>
              <Tag
                color={getRoleColor(userRole)}
                style={{ textTransform: "capitalize" }}
              >
                {userRole}
              </Tag>
              {currentUser.gender && (
                <Tag>Gender: {currentUser.gender}</Tag>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Left Column */}
        <Col xs={24} md={12}>
          <Card
            title={t("PERSONAL_INFORMATION")}
            bordered={false}
            style={{ borderRadius: 12, height: "100%" }}
          >
            <Descriptions
              column={1}
              labelStyle={{ color: "var(--ant-color-text-secondary)" }}
            >
              <Descriptions.Item label={t("EMAIL")}>
                {userEmail}
              </Descriptions.Item>
              <Descriptions.Item
                label={t("GENDER")}
                style={{ textTransform: "capitalize" }}
              >
                {currentUser.gender || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label={t("CITY")}>
                {currentUser.city || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label={t("ADDRESS")}>
                {currentUser.address || "N/A"}
              </Descriptions.Item>
              {createdAt && (
                <Descriptions.Item label="Created At">
                  {new Date(createdAt).toLocaleString()}
                </Descriptions.Item>
              )}
              {updatedAt && (
                <Descriptions.Item label="Updated At">
                  {new Date(updatedAt).toLocaleString()}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>
        </Col>

      </Row>
    </div>
  );
};

export default UserDetails;
