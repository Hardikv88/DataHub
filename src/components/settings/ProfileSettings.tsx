import React from "react";
import { Form, Input, Button, Row, Col, Avatar, Space, Upload, message } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";

const ProfileSettings: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const onFinish = (_values: any) => {
    message.success(t("SAVE_CHANGES") + " successful!");
  };

  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        firstName: "John", 
        lastName: "Doe", 
        email: "john.doe@example.com", 
        phone: "+1 234 567 890", 
        bio: "Software Developer from California.", 
      }}
    >
      <Row gutter={24} align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Avatar size={100} icon={<UserOutlined />} />
        </Col>
        <Col>
          <Space direction="vertical">
            <Upload showUploadList={false}>
              <Button icon={<UploadOutlined />}>{t("CHANGE_AVATAR")}</Button>
            </Upload>
            <Button type="link" danger size="small">{t("REMOVE")}</Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="firstName"
            label={<span style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>{t("FIRST_NAME")}</span>}
            rules={[{required: true, message: "Please input your first name!"}]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="lastName"
            label={
              <span style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
                {t("LAST_NAME")}
              </span>
            }
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="email"
        label={
          <span style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
            {t("EMAIL")}
          </span>
        }
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "The input is not valid E-mail!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label={
          <span style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
            {t("PHONE_NUMBER")}
          </span>
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="bio"
        label={
          <span style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
            {t("BIO")}
          </span>
        }
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("SAVE_CHANGES")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileSettings;