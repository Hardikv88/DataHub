import React, { useState } from "react";
import { Row, Col, Typography, Table, Select } from "antd";
import { Card } from "../../../components/common/Card";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export const RecentOrders: React.FC = () => {
  const { t } = useTranslation();
  const recentOrdersColumns = [
    { title: t("PRODUCT_NAME"), dataIndex: "name", key: "name" },
    { title: t("LOCATION"), dataIndex: "location", key: "location" },
    { title: t("DATE_TIME"), dataIndex: "datetime", key: "datetime" },
    { title: t("PIECE"), dataIndex: "piece", key: "piece" },
    { title: t("AMOUNT"), dataIndex: "amount", key: "amount" },
    {
      title: t("STATUS"),
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
              status === "Delivered"
                ? "var(--success)"
                : status === "Pending"
                  ? "var(--warning)"
                  : status === "Processing"
                    ? "var(--info)"
                    : "var(--danger)",
            color: "var(--white)",
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
    {
      key: "2",
      name: "Essence Mascara Lash Princess",
      location: "Ahmedabad",
      datetime: "10.03.2016 - 06.12 AM",
      piece: 13,
      amount: "$129.87",
      status: "Pending",
    },
    {
      key: "3",
      name: "Eyeshadow Palette with Mirror",
      location: "Rajkot",
      datetime: "22.02.2016 - 03.43 PM",
      piece: 23,
      amount: "$24,295",
      status: "Processing",
    },
    {
      key: "4",
      name: "Powder Canister",
      location: "Surat",
      datetime: "08.05.2017 - 02.18 PM",
      piece: 14,
      amount: "$04,563",
      status: "Canceled",
    },
    {
      key: "5",
      name: "Calvin Klein CK One",
      location: "Vadodara",
      datetime: "28.08.2017 - 01.37 PM",
      piece: 4,
      amount: "$853",
      status: "Processing",
    },
    {
      key: "6",
      name: "Chanel Coco Noir Eau De",
      location: "Navasari",
      datetime: "23.09.2017 - 04.30 AM",
      piece: 12,
      amount: "$1,929",
      status: "Pending",
    },
    {
      key: "7",
      name: "Dior J'adore",
      location: "Rajkot",
      datetime: "19.10.2017 - 08.12 PM",
      piece: 22,
      amount: "$11,722",
      status: "Delivered",
    },
    {
      key: "8",
      name: "Dolce Shine Eau de",
      location: "Ahmedabad",
      datetime: "14.08.2017 - 02.36 PM",
      piece: 16,
      amount: "$10,102",
      status: "Processing",
    },
    {
      key: "9",
      name: "Gucci Bloom Eau de",
      location: "Surat",
      datetime: "10.04.2017 - 06.10 PM",
      piece: 120,
      amount: "$9,765",
      status: "Canceled",
    },
    {
      key: "10",
      name: "Gucci Bloom Eau de",
      location: "Amreli",
      datetime: "12.09.2017 - 02.18 PM",
      piece: 47,
      amount: "$4,472",
      status: "Delivered",
    },
  ];

const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredData =
    selectedStatus === "All"
      ? recentOrdersData
      : recentOrdersData.filter((item) => item.status === selectedStatus);

  const orderStatus = ["All","Pending", "Processing", "Delivered", "Canceled"];

  

  return (
    <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
      <Col span={24}>
        <Card noPadding>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 24,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <Title level={4} style={{ margin: 0, color: "var(--text-h)" }}>
              {t("RECENT_ORDERS")}
            </Title>

            <Select
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
              style={{ width: 120 }}
              options={orderStatus.map((m) => ({ label: m, value: m }))}
            />
          </div>
          <Table
            columns={recentOrdersColumns}
            dataSource={filteredData}
            pagination={false}
            style={{ padding: 24 }}
            rowClassName={() => "dashboard-table-row"}
          />
        </Card>
      </Col>
    </Row>
  );
};
