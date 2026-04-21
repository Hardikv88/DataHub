import React, { useState } from "react";
import { Row, Col, Typography, Table } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { Card } from "../../components/common/Card";
import { Colors } from "../../theme/colors";
import { GLOBAL_TEXT } from "../../constants/Strings";
import { Line } from "@ant-design/plots";
import CountUpNumber from "../../utils/CountUpNumber";
import { Select } from "antd";

const { Title, Text } = Typography;

const [selectedMonth, setSelectedMonth] = useState("Jan");

const months = ["all", "Jan", "Feb", "Mar", "Apr", "May"];

const rawData = [
  { year: "1991", value: 3, month: "Jan" },
  { year: "1992", value: 4, month: "Jan" },
  { year: "1993", value: 3.5, month: "Feb" },
  { year: "1994", value: 5, month: "Feb" },
  { year: "1995", value: 4.9, month: "Mar" },
  { year: "1996", value: 6, month: "Mar" },
  { year: "1997", value: 7, month: "Apr" },
  { year: "1998", value: 9, month: "Apr" },
  { year: "1999", value: 13, month: "May" },
];


const config = {
  data: filteredData,
  xField: "year",
  yField: "value",

  smooth: true,

  animation: {
    appear: {
      animation: "path-in",
      duration: 800,
    },
    update: {
      duration: 600,
    },
  },

  xAxis: {
    label: {
      style: { fill: "#1451a6" },
    },
  },

  yAxis: {
    label: {
      style: { fill: "#3176d6" },
    },
  },

  point: {
    size: 4,
    shape: "circle",
  },

  area: {
    style: {
      fillOpacity: 0.2,
    },
  },

  tooltip: {
    showMarkers: true,
  },

  lineStyle: {
    lineWidth: 2,
  },
};

const StatCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  isPositive: boolean;
  prefix: string;
}> = ({ title, value, icon, trend, isPositive, prefix }) => (
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
      <span style={{ color: "var(--text)" }}>Up from yesterday</span>
    </div>
  </Card>
);

const recentOrdersColumns = [
  { title: GLOBAL_TEXT.PRODUCT_NAME, dataIndex: "name", key: "name" },
  { title: GLOBAL_TEXT.LOCATION, dataIndex: "location", key: "location" },
  { title: GLOBAL_TEXT.DATE_TIME, dataIndex: "datetime", key: "datetime" },
  { title: GLOBAL_TEXT.PIECE, dataIndex: "piece", key: "piece" },
  { title: GLOBAL_TEXT.AMOUNT, dataIndex: "amount", key: "amount" },
  {
    title: GLOBAL_TEXT.STATUS,
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <span
        style={{
          padding: "4px 12px",
          borderRadius: 20,

          fontSize: 12,
          fontWeight: 600,
          backgroundColor:
            status === "Delivered" ? "var(--success)" : "var(--danger)",
          color: status === "Delivered" ? "var(--white)" : "var(--white)",
        }}
      >
        {status}
      </span>
    ),
  },
];

const recentOrdersData = [
  {
    key: "1",
    name: "Apple Watch",
    location: "6096 Marjolaine Landing",
    datetime: "12.09.2019 - 12.53 PM",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
  },
];

export const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="dashboard-heading">Dashboard</h1>

      <div className="dashboard-grid">
        <StatCard
          title="Total Users"
          value="40,689"
          icon={<UserOutlined />}
          trend="8.5%"
          isPositive={true}
          prefix=""
        />
        <StatCard
          title="Total Orders"
          value="10,293"
          icon={<ShoppingCartOutlined />}
          trend="1.3%"
          isPositive={true}
          prefix=""
        />
        <StatCard
          title="Today's Sales"
          value="89,000"
          icon={<DollarOutlined />}
          trend="4.3%"
          isPositive={false}
          prefix="$"
        />
        <StatCard
          title="Active Users"
          value="2040"
          icon={<RiseOutlined />}
          trend="1.8%"
          isPositive={true}
          prefix=""
        />
      </div>

      <div>
        <Card>
          <Title
            level={4}
            style={{ marginTop: 0, marginBottom: 24, color: "var(--text-h)" }}
          >
            Sales Details
          </Title>
          <div style={{ height: 320 }}>
            <Select
              value={selectedMonth}
              onChange={setSelectedMonth}
              style={{ width: 120 }}
              options={months.map((m) => ({ label: m, value: m }))}
            />
            <Line {...config} autoFit />
          </div>
        </Card>
      </div>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card noPadding>
            <div
              style={{ padding: 24, borderBottom: "1px solid var(--border)" }}
            >
              <Title level={4} style={{ margin: 0, color: "var(--text-h)" }}>
                Recent Orders
              </Title>
            </div>
            <Table
              columns={recentOrdersColumns}
              dataSource={recentOrdersData}
              pagination={false}
              style={{ padding: 24 }}
              rowClassName={() => "dashboard-table-row"}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
