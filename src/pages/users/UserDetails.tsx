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
    switch (role) {
      case "admin":
        return "red";
      case "moderator":
        return "geekblue";
      default:
        return "green";
    }
  };

  const maskCardNumber = (cardNumber: string) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
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

  return (
    <div className="product-details-container">
      <div className="breadcrumb-wrapper">
        <Breadcrumb
          items={[
            { title: <Link to="/dashboard">Home</Link> },
            { title: <Link to="/users">Users</Link> },
            { title: currentUser.firstName },
          ]}
        />
      </div>

      {/* Top Section */}
      <Card bordered={false} style={{ borderRadius: 12, marginBottom: 24 }}>
        <Row align="middle" gutter={24}>
          <Col>
            <Avatar
              src={currentUser.image}
              size={100}
              style={{ backgroundColor: "#f0f2f5" }}
            />
          </Col>
          <Col flex="auto">
            <Title level={3} style={{ margin: 0 }}>
              {currentUser.firstName} {currentUser.lastName}
            </Title>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: 8 }}
            >
              @{currentUser.username}
            </Text>
            <Space>
              <Tag
                color={getRoleColor(currentUser.role)}
                style={{ textTransform: "capitalize" }}
              >
                {currentUser.role}
              </Tag>
              {currentUser.bloodGroup && (
                <Tag>Blood: {currentUser.bloodGroup}</Tag>
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
                {currentUser.email}
              </Descriptions.Item>
              <Descriptions.Item label={t("PHONE")}>
                {currentUser.phone}
              </Descriptions.Item>
              <Descriptions.Item label={t("AGE")}>
                {currentUser.age}
              </Descriptions.Item>
              <Descriptions.Item
                label={t("GENDER")}
                style={{ textTransform: "capitalize" }}
              >
                {currentUser.gender}
              </Descriptions.Item>
              <Descriptions.Item label={t("BIRTH_DATE")}>
                {currentUser.birthDate}
              </Descriptions.Item>
              <Descriptions.Item label={t("UNIVERSITY")}>
                {currentUser.university}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Right Column */}
        <Col xs={24} md={12}>
          <Card
            title={t("COMPANY_INFORMATION")}
            bordered={false}
            style={{ borderRadius: 12, height: "100%" }}
          >
            <Descriptions
              column={1}
              labelStyle={{ color: "var(--ant-color-text-secondary)" }}
            >
              <Descriptions.Item label={t("COMPANY_NAME")}>
                {currentUser.company.name}
              </Descriptions.Item>
              <Descriptions.Item label={t("DEPARTMENT")}>
                {currentUser.company.department}
              </Descriptions.Item>
              <Descriptions.Item label={t("TITLE")}>
                {currentUser.company.title}
              </Descriptions.Item>
              <Descriptions.Item label={t("COMPANY_ADDRESS")}>
                {currentUser.company.address.address},{" "}
                {currentUser.company.address.city},{" "}
                {currentUser.company.address.stateCode}{" "}
                {currentUser.company.address.postalCode}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Full Width Column */}
        <Col span={24}>
          <Card title={t("LOCATION")} bordered={false} style={{ borderRadius: 12 }}>
            <Descriptions
              column={{ xs: 1, sm: 2, md: 3 }}
              labelStyle={{ color: "var(--ant-color-text-secondary)" }}
            >
              <Descriptions.Item label={t("ADDRESS")}>
                {currentUser.address.address}
              </Descriptions.Item>
              <Descriptions.Item label={t("CITY")}>
                {currentUser.address.city}
              </Descriptions.Item>
              <Descriptions.Item label={t("STATE")}>
                {currentUser.address.state}
              </Descriptions.Item>
              <Descriptions.Item label={t("POSTAL_CODE")}>
                {currentUser.address.postalCode}
              </Descriptions.Item>
              <Descriptions.Item label={t("COUNTRY")}>
                {currentUser.address.country}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={t("BANK_INFORMATION")}
            bordered={false}
            style={{ borderRadius: 12, height: "100%" }}
          >
            <Descriptions
              column={1}
              labelStyle={{color: "var(--ant-color-text-secondary)"}}
            >
              <Descriptions.Item label={t("CARD_TYPE")}>
                {currentUser.bank.cardType}
              </Descriptions.Item>
              <Descriptions.Item label={t("CARD_NUMBER")}>
                {maskCardNumber(currentUser.bank.cardNumber)}
              </Descriptions.Item>
              <Descriptions.Item label={t("EXPIRY")}>
                {currentUser.bank.cardExpire}
              </Descriptions.Item>
              <Descriptions.Item label={t("CURRENCY")}>
                {currentUser.bank.currency}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            title={t("CRYPTO_INFORMATION")}
            bordered={false}
            style={{ borderRadius: 12, height: "100%" }}
          >
            <Descriptions
              column={1}
              labelStyle={{ color: "var(--ant-color-text-secondary)" }}
            >
              <Descriptions.Item label={t("COIN")}>
                {currentUser.crypto.coin}
              </Descriptions.Item>
              <Descriptions.Item label={t("NETWORK")}>
                {currentUser.crypto.network}
              </Descriptions.Item>
              <Descriptions.Item
                label={t("WALLET_ADDRESS")}
                style={{ wordBreak: "break-all" }}
              >
                {currentUser.crypto.wallet}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDetails;
