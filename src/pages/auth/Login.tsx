import React, { useState } from "react";
import { Checkbox, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Colors } from "../../theme/colors";
import "./auth.css";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login"); // Keep users on login since dash isn't implemented
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-inner">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Title
              level={2}
              style={{
                color: Colors.heading,
                marginBottom: 8,
                fontWeight: 800,
              }}
            >
              Login to Account
            </Title>
            <Text style={{ color: Colors.text, fontSize: 16 }}>
              Please enter your email and password to continue
            </Text>
          </div>

          <form onSubmit={handleLogin}>
            <Input
              label="Email address"
              placeholder="esteban_schiller@gmail.com"
              type="email"
              required
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <label
                style={{ fontWeight: 600, color: Colors.heading, fontSize: 14 }}
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                style={{ color: Colors.text, fontSize: 14 }}
              >
                Forget Password?
              </Link>
            </div>
            <Input
              placeholder="••••••••"
              type="password"
              required
              style={{ marginBottom: 24 }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Checkbox style={{ color: Colors.text }}>
                Remember Password
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
              <Text style={{ color: Colors.text }}>
                Don't have an account?{" "}
              </Text>
              <Link
                to="/register"
                style={{ color: Colors.primary, fontWeight: 600 }}
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
