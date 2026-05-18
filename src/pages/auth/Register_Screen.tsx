import React, { useState } from "react";
import { Checkbox } from "antd";
import { useNavigate, Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { Colors } from "../../theme/colors";
import "./auth.css";
import Text from "../../components/common/Text";
import { useTranslation } from "react-i18next";

const Register: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper" style={{ width: "100%" }}>
        <div className="auth-inner" style={{ width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Text variant="heading">{t("CREATE_AN_ACCOUNT")}</Text>
            <div style={{ height: 8 }} />
            <Text variant="subText">
              {t("CREATE_A_ACCOUNT_CONTINUE")}
            </Text>
          </div>

          <form onSubmit={handleRegister}>
            <Input
              label={t("FULL_NAME")}
              name="fullName"
              placeholder={t("ENTER_YOUR_FULL_NAME")}
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
            />

            <Input
              label={t("EMAIL")}
              name="email"
              placeholder={t("ENTER_YOUR_EMAIL")}
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label={t("PASSWORD")}
              name="password"
              placeholder="••••••••"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />

            <Input
              label={t("CONFIRM_PASSWORD")}
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
              required
              validationError={error}
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ marginBottom: 24 }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <Checkbox required style={{ color: Colors.text }}>
                <Text variant="hintText">
                  {t("I_ACCEPT_TERMS_AND_CONDITIONS")}{" "}
                </Text>
              </Checkbox>
            </div>

            <Button
              fullWidth
              htmlType="submit"
              loading={loading}
              style={{ marginBottom: 24 }}
            >
              {t("SIGN_UP")}
            </Button>

            <div style={{ textAlign: "center" }}>
              <Text variant="hintText">
                {t("ALREADY_HAVE_AN_ACCOUNT")}
              </Text>
              <Link to="/" style={{ color: Colors.primary, fontWeight: 600 }}>
                {t("LOGIN")}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
