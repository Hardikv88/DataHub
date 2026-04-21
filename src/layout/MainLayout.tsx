import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const { Content } = Layout;

export const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Sidebar />

      <Layout
        style={{
          marginLeft: 250,
          transition: "all 0.2s",
          height: "100vh", // ✅ full height
          overflow: "hidden",
        }}
      >
        <Header />
        <Content
          style={{
            padding: "24px",
            margin: 0,
            minHeight: 280,
            background: "var(--bg)",
            overflowY: "auto",
            height: "calc(100vh - 70px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
