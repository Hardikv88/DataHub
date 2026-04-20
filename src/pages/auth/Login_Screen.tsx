import React, { useState } from "react";
import { Checkbox } from "antd";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Colors } from "../../theme/colors";
import "./auth.css";
import Text from "../../components/common/Text";
import { GLOBAL_TEXT, LOGIN_TEXT } from "../../constants/Strings";
import apiHelper from "../../services/ApiHelper";
import type { LoginResponseModel } from "../../modals/LoginResponseModel";
import { setToken } from "../../utils/LocalStorage";
import { useAuth } from "../../hooks/useAuth";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "emilys",
    password: "emilyspass",
  });
  const { login } = useAuth();

  const handleSubmit = () => {
    const { email, password } = formData;

    console.log(
      "Submitting form with data:",
      formData.email,
      formData.password,
    );

    // Simple validation
    if (!email) {
      alert(LOGIN_TEXT.EMAIL_IS_REQUIRED);
      return;
    }

    if (!password) {
      alert(LOGIN_TEXT.PASSWORD_IS_REQUIRED);
      return;
    }

    getLoginUser(email, password);
    // API call here
  };

  const getLoginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await apiHelper
        .post<LoginResponseModel>("/auth/login", {
          username: email,
          password: password,
        })
        .catch((err) => {
          console.log("Errr", err.message);
        });
      login(response.data);
      setToken(response.data.accessToken); // Store entire user data (including tokens) securely
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-inner">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Text variant="heading">{LOGIN_TEXT.LOGIN_TO_YOUR_ACCOUNT}</Text>
            <div style={{ height: 8 }} />
            <Text variant="subText">
              {LOGIN_TEXT.PLEASE_ENTER_YOUR_EMAIL_AND_PASSWORD}
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
              label={GLOBAL_TEXT.EMAIL}
              placeholder={GLOBAL_TEXT.ENTER_YOUR_EMAIL}
              type="text"
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text variant="text">{GLOBAL_TEXT.PASSWORD}</Text>
              <Text variant="hintText">{LOGIN_TEXT.FORGOT_PASSWORD}</Text>
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
                <Text variant="hintText">{LOGIN_TEXT.REMEMBER_PASSWORD}</Text>
              </Checkbox>
            </div>

            <Button
              fullWidth
              htmlType="submit"
              loading={loading}
              style={{ marginBottom: 24 }}
            >
              Sign In
            </Button>

            <div style={{ textAlign: "center" }}>
              <Text variant="hintText">{LOGIN_TEXT.DONT_HAVE_AN_ACCOUNT}</Text>
              <Link
                to="/register"
                className="text"
                style={{ color: Colors.primary }}
              >
                {LOGIN_TEXT.CREATE_ACCOUNT}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
