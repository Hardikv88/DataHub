import React, { useState } from "react";
import { Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Colors } from "../../theme/colors";
import "./auth.css";
import Text from "../../components/common/Text";
import { apiHelperOne } from "../../services/ApiHelper";
import type { LoginResponseModel } from "../../modals/LoginResponseModel";
import { setToken } from "../../utils/LocalStorage";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleSubmit = () => {
    const { email, password } = formData;

    // Simple validation
    if (!email) {
      message.error(t("EMAIL_IS_REQUIRED"));
      return;
    }

    if (!password) {
      message.error(t("PASSWORD_IS_REQUIRED"));
      return;
    }

    getLoginUser(email, password);
  };

  const getLoginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiHelperOne.post<LoginResponseModel>("/auth/login", {
        userEmail: email,
        userPassword: password,
      });
      
      if (response && response.data && response.data.success) {
        const { data } = response.data;
        
        // Save token and user data
        setToken(data.token);
        login(data.user);
        
        // Show success message
        message.success(response.data.message || "Login successful!");
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        message.error(response.data?.message || "Login failed");
      }
      
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.error("Login error:", error);
      
      // Show error message from API or generic message
      const errorMessage = error?.response?.data?.message 
        || error?.message 
        || "Login failed. Please try again.";
      message.error(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-inner">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Text variant="heading">{t("LOGIN_TO_YOUR_ACCOUNT")}</Text>
            <div style={{ height: 8 }} />
            <Text variant="subText">
              {t("PLEASE_ENTER_YOUR_EMAIL_AND_PASSWORD")}
            </Text>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Input
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              label={t("EMAIL")}
              placeholder={t("ENTER_YOUR_EMAIL")}
              type="email"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text variant="text">{t("PASSWORD")}</Text>
              <Text variant="hintText">{t("FORGOT_PASSWORD")}</Text>
            </div>
            <Input
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              type="password"
              style={{ marginBottom: 24 }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Checkbox>
                <Text variant="hintText">{t("REMEMBER_PASSWORD")}</Text>
              </Checkbox>
            </div>

            <Button
              fullWidth
              htmlType="submit"
              loading={loading}
              style={{ marginBottom: 24 }}
            >
              {t("SIGNIN")}
            </Button>

            <div style={{ textAlign: "center" }}>
              <Text variant="hintText">{t("DONT_HAVE_AN_ACCOUNT")}</Text>
              <Link to="/register" style={{ color: Colors.primary, fontWeight: 600 }}>
                {t("SIGN_UP")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
