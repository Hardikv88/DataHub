import React, { useState, useRef } from "react";
import {
  Card,
  Avatar,
  Typography,
  Descriptions,
  Row,
  Col,
  Divider,
  Button,
  Form,
  Input,
  Select,
  message,
  Space,
  Modal,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  WomanOutlined,
  ManOutlined,
  EditOutlined,
  CameraOutlined,
  SaveOutlined,
  CloseOutlined,
  EnvironmentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";
import { useThemeContext } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { apiHelperOne } from "../../services/ApiHelper";

const { Title, Text } = Typography;
const { Option } = Select;



export const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { isDarkMode } = useThemeContext();
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Initialize form with user data when entering edit mode
  const handleEdit = () => {
    form.setFieldsValue({
      userName: user.userName || "",
      userEmail: user.userEmail || "",
      gender: user.gender || "male",
      city: user.city || "",
      address: user.address || "",
    });
    setIsEditing(true);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    setSelectedFile(null);
    setPreviewImage("");
  };

  // Handle save profile
  const handleSave = async (values: any) => {
    try {
      const formData = new FormData();
      
      formData.append("userName", values.userName);
      if (values.city) {
        formData.append("city", values.city);
      }
      if (values.gender) {
        formData.append("gender", values.gender);
      }
      if (values.address) {
        formData.append("address", values.address);
      }
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      const response = await apiHelperOne.put("/auth/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${getToken<string>()}`,
        },
      });

      if (response.data && response.data) {
        message.success("Profile updated successfully!");
        updateUser(response.data["data"]);
        setIsEditing(false);
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      message.error("Failed to update profile");
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setPreviewImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  if (!user) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Text>{t("LOADING")}...</Text>
      </div>
    );
  }

  const genderIcon =
    user?.gender === "female" ? (
      <WomanOutlined style={{ color: "#eb2f96" }} />
    ) : (
      <ManOutlined style={{ color: "#1890ff" }} />
    );
      console.log("user image",user?.profileImage)
  return (
    
    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Title
          level={2}
          style={{
            color: isDarkMode ? "#ffffff" : "#000000",
            margin: 0,
          }}
        >
          {t("USER_PROFILE")}
        </Title>

        {/* Edit/Save Buttons */}
        {!isEditing ? (
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleEdit}
            size="large"
          >
            {t("EDIT_PROFILE")}
          </Button>
        ) : (
          <Space>
            <Button
              icon={<CloseOutlined />}
              onClick={handleCancel}
              size="large"
            >
              {t("CANCEL")}
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={() => form.submit()}
              size="large"
            >
              {t("SAVE")}
            </Button>
          </Space>
        )}
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <Card
            style={{
              borderRadius: 12,
              textAlign: "center",
              background: isDarkMode ? "#1f1f1f" : "#ffffff",
              border: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {/* Profile Image with Upload */}
            <div style={{ position: "relative", display: "inline-block" }}>
              <Avatar
                size={120}
                 src={previewImage || (import.meta.env.VITE_BASE_URL_IMAGE + user?.profileImage)}
                icon={<UserOutlined />}
                style={{
                  marginBottom: 16,
                  border: "4px solid var(--primary-color)",
                  boxShadow: "0 0 20px rgba(0,0,0,0.1)",
                }}
              />
              
              {/* Camera Icon for Upload */}
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: 0,
                  background: "var(--primary-color)",
                  borderRadius: "50%",
                  padding: 8,
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                onClick={triggerImageUpload}
              >
                <CameraOutlined style={{ color: "#fff", fontSize: 16 }} />
              </div>
              
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <Title
              level={4}
              style={{
                margin: 0,
                color: isDarkMode ? "#ffffff" : "#000000",
              }}
            >
              {user?.userName}
            </Title>
            <Text type="secondary">@{user?.userName}</Text>

            <Divider />

            {/* Display Mode */}
            {!isEditing ? (
              <div style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 16 }}>
                  <Text
                    strong
                    style={{
                      color: isDarkMode ? "#ffffff" : "#000000",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {t("EMAIL")}
                  </Text>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <MailOutlined style={{ color: "#1890ff" }} />
                    <Text ellipsis>{user?.userEmail}</Text>
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <Text
                    strong
                    style={{
                      color: isDarkMode ? "#ffffff" : "#000000",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {t("GENDER")}
                  </Text>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    {genderIcon}
                    <Text style={{ textTransform: "capitalize" }}>
                      {user?.gender || "Not specified"}
                    </Text>
                  </div>
                </div>

                {/* City */}
                {user?.city && (
                  <div style={{ marginBottom: 16 }}>
                    <Text
                      strong
                      style={{
                        color: isDarkMode ? "#ffffff" : "#000000",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      {t("CITY")}
                    </Text>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <EnvironmentOutlined style={{ color: "#52c41a" }} />
                      <Text>{user.city}</Text>
                    </div>
                  </div>
                )}

                {/* Address */}
                {user?.address && (
                  <div>
                    <Text
                      strong
                      style={{
                        color: isDarkMode ? "#ffffff" : "#000000",
                        display: "block",
                        marginBottom: 4,
                      }}
                    >
                      {t("ADDRESS")}
                    </Text>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <HomeOutlined style={{ color: "#fa8c16" }} />
                      <Text>{user.address}</Text>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Edit Mode Form */
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSave}
                initialValues={{
                  userName: user?.userName,
                  userEmail: user?.userEmail,
                  gender: user?.gender || "male",
                  city: user?.city || "",
                  address: user?.address || "",
                }}
              >
                <Form.Item
                  name="userName"
                  label={t("USER_NAME")}
                  rules={[
                    { required: true, message: t("PLEASE_ENTER_USER_NAME") },
                  ]}
                >
                  <Input placeholder={t("ENTER_USER_NAME")} />
                </Form.Item>

                <Form.Item
                  name="userEmail"
                  label={t("EMAIL")}
                >
                  <Input placeholder={t("ENTER_EMAIL")} disabled />
                </Form.Item>

                <Form.Item name="gender" label={t("GENDER")}>
                  <Select placeholder={t("SELECT_GENDER")}>
                    <Option value="male">{t("MALE")}</Option>
                    <Option value="female">{t("FEMALE")}</Option>
                    <Option value="other">{t("OTHER")}</Option>
                  </Select>
                </Form.Item>

                <Form.Item name="city" label={t("CITY")}>
                  <Input
                    placeholder={t("ENTER_CITY")}
                    prefix={<EnvironmentOutlined />}
                  />
                </Form.Item>

                <Form.Item name="address" label={t("ADDRESS")}>
                  <Input.TextArea
                    placeholder={t("ENTER_ADDRESS")}
                    rows={3}
                    //prefix={<HomeOutlined />}
                  />
                </Form.Item>
              </Form>
            )}
          </Card>
        </Col>

        {/* Right Column - Detailed Information */}
        {!isEditing && (
          <Col xs={24} md={16}>
            <Card
              title={
                <span
                  style={{ color: isDarkMode ? "#ffffff" : "#000000" }}
                >
                  {t("DETAILED_INFORMATION")}
                </span>
              }
              style={{
                borderRadius: 12,
                background: isDarkMode ? "#1f1f1f" : "#ffffff",
                border: `1px solid ${
                  isDarkMode ? "#303030" : "#f0f0f0"
                }`,
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <Descriptions
                bordered
                column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                labelStyle={{
                  background: isDarkMode ? "#141414" : "#fafafa",
                  color: isDarkMode ? "#ffffff" : "#000000",
                  fontWeight: 600,
                }}
                contentStyle={{
                  background: isDarkMode ? "#1f1f1f" : "#ffffff",
                  color: isDarkMode
                    ? "rgba(255, 255, 255, 0.85)"
                    : "rgba(0, 0, 0, 0.85)",
                }}
              >
                <Descriptions.Item label={t("USER_ROLE")}>
                  {user?.userRole}
                </Descriptions.Item>
                <Descriptions.Item label={t("USER_NAME")}>
                  {user?.userName}
                </Descriptions.Item>
                <Descriptions.Item label={t("EMAIL")} span={2}>
                  {user?.userEmail}
                </Descriptions.Item>
                <Descriptions.Item label={t("GENDER")}>
                  <span style={{ textTransform: "capitalize" }}>
                    {user?.gender || "Not specified"}
                  </span>
                </Descriptions.Item>
                {user?.city && (
                  <Descriptions.Item label={t("CITY")}>
                    {user.city}
                  </Descriptions.Item>
                )}
                {user?.address && (
                  <Descriptions.Item label={t("ADDRESS")} span={2}>
                    {user.address}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>
          </Col>
        )}
      </Row>

      {/* Image Preview Modal */}
      <Modal
        open={previewOpen}
        title={t("PREVIEW_IMAGE")}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img
          alt="preview"
          style={{ width: "100%" }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export default Profile;
