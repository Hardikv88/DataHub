import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { useTranslation } from "react-i18next";

const { Content } = Layout;

const SIDEBAR_EXPANDED = 250;
const SIDEBAR_COLLAPSED = 80;

export const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { i18n } = useTranslation();

  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(false);
        setMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMobileMenuToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const marginValue = isMobile ? 0 : collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  return (
    <Layout style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />

      <Layout
        className="main-content-wrapper"
        style={{ 
          marginLeft: isRtl ? 0 : marginValue,
          marginRight: isRtl ? marginValue : 0,
          transition: 'margin 0.3s cubic-bezier(0.2, 0, 0, 1)'
        }}
      >
        <Header onMobileMenuToggle={handleMobileMenuToggle} />
        <Content className="main-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
