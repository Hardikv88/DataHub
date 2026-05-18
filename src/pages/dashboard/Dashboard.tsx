import React from "react";
import { Typography } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Card } from "../../components/common/Card";
import { Colors } from "../../theme/colors";
import { useTranslation } from "react-i18next";

import CountUpNumber from "../../utils/CountUpNumber";
import { LineChart } from "./components/LineChart";
import { RecentOrders } from "./components/RecentOrders";

const { Title, Text } = Typography;

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  isPositive: boolean;
  prefix: string;
  t: any;
}> = ({ title, value, icon, trend, isPositive, prefix, t }) => (
  <Card
    style={{
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      gap: 16,
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Text style={{ color: "var(--text)", fontSize: 16 }}>{title}</Text>
        <Title
          level={2}
          style={{ margin: 0, marginTop: 8, color: "var(--text-h)" }}
        >
          <span>
            {prefix}
            <CountUpNumber end={Number(value.replace(/,/g, ""))} />
          </span>
        </Title>
      </div>
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 14,
          backgroundColor: "var(--accent-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          color: Colors.primary,
        }}
      >
        {icon}
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <RiseOutlined
        rotate={isPositive ? 0 : 180}
        style={{ color: isPositive ? Colors.success : Colors.danger }}
      />
      <span
        style={{
          color: isPositive ? Colors.success : Colors.danger,
          fontWeight: 600,
        }}
      >
        {trend}
      </span>
      <span style={{ color: "var(--text)" }}>{t("UP_FROM_YESTERDAY")}</span>
    </div>
  </Card>
);

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="dashboard-heading">{t("DASHBOARD")}</h1>
      <div className="dashboard-grid">
        <StatCard
          title={t("TOTAL_USERS")}
          value="40,689"
          icon={<UserOutlined />}
          trend="8.5%"
          isPositive={true}
          prefix=""
          t={t}
        />
        <StatCard
          title={t("TOTAL_ORDERS")}
          value="10,293"
          icon={<ShoppingCartOutlined />}
          trend="1.3%"
          isPositive={true}
          prefix=""
          t={t}
        />
        <StatCard
          title={t("TODAY_SALES")}
          value="89,000"
          icon={<DollarOutlined />}
          trend="4.3%"
          isPositive={false}
          prefix="$"
          t={t}
        />
        <StatCard
          title={t("ACTIVE_USERS")}
          value="2040"
          icon={<RiseOutlined />}
          trend="1.8%"
          isPositive={true}
          prefix=""
          t={t}
        />
      </div>

      <LineChart />
      <RecentOrders/>
     
    </div>
  );
};
