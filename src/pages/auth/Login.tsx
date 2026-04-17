import React, { useState } from "react";
import { Checkbox} from "antd";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Colors } from "../../theme/colors";
import "./auth.css";
import Text from "../../components/common/Text";
import { GLOBAL_TEXT, LOGIN_TEXT } from "../../constants/Strings";


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
          <div style={{ textAlign: "center", marginBottom: 40}}>
            <Text variant="heading">
              {LOGIN_TEXT.LOGIN_TO_YOUR_ACCOUNT}
            </Text>
            <div style={{ height: 8}} />
            <Text variant="subText">
              {LOGIN_TEXT.PLEASE_ENTER_YOUR_EMAIL_AND_PASSWORD}
            </Text>
          </div>

          <form onSubmit={handleLogin}>
            <Input
              label={GLOBAL_TEXT.EMAIL}
              placeholder={GLOBAL_TEXT.ENTER_YOUR_EMAIL}
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
              <Text variant="text" >
                {GLOBAL_TEXT.PASSWORD}
              </Text >
              <Text variant="hintText" >{LOGIN_TEXT.FORGOT_PASSWORD}</Text>
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
              <Checkbox >
                <Text variant="hintText">
                 {LOGIN_TEXT.REMEMBER_PASSWORD}
              </Text>
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
              <Text variant="hintText">
                {LOGIN_TEXT.DONT_HAVE_AN_ACCOUNT}
              </Text>
              <Link
                to="/register"
                className="text"
                style={{ color: Colors.primary }}
              >
                {LOGIN_TEXT.CREATE_AN_ACCOUNT}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
