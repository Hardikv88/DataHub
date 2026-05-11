import React from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  Row,
  Col,
  Space,
  message,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { GLOBAL_TEXT } from "../../constants/Strings";
import { useThemeContext } from "../../theme/ThemeContext";

const ProfileSettings: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const [form] = Form.useForm();
  const onFinish = (_values: any) => {
    message.success(GLOBAL_TEXT.SAVE_CHANGES + " successful!");
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
              <Button icon={<UploadOutlined />}>{GLOBAL_TEXT.CHANGE_AVATAR}</Button>
            </Upload>
            <Button type="link" danger size="small">{GLOBAL_TEXT.REMOVE}</Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="firstName"
            label={<span style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>{GLOBAL_TEXT.FIRST_NAME}</span>}
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
                {GLOBAL_TEXT.LAST_NAME}
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
            {GLOBAL_TEXT.EMAIL}
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
            {GLOBAL_TEXT.PHONE_NUMBER}
          </span>
        }
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="bio"
        label={
          <span style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
            {GLOBAL_TEXT.BIO}
          </span>
        }
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {GLOBAL_TEXT.SAVE_CHANGES}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileSettings;