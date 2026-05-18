import React, { useState } from "react";
import { Typography, Select } from "antd";
import { Card } from "../../../components/common/Card";
import { useTranslation } from "react-i18next";
import { Line } from "@ant-design/plots";
import { useThemeContext } from "../../../theme/ThemeContext";

const { Title } = Typography;

const rawData = [
  { year: "1991", value: 2, month: "Jan" },
  { year: "1992", value: 4, month: "Jan" },
  { year: "1994", value: 6, month: "Jan" },
  { year: "1996", value: 1, month: "Jan" },
  { year: "1992", value: 3.5, month: "Feb" },
  { year: "1994", value: 5, month: "Feb" },
  { year: "1995", value: 7, month: "Feb" },
  { year: "1992", value: 4.9, month: "Mar" },
  { year: "1995", value: 2, month: "Mar" },
  { year: "1996", value: 6, month: "Mar" },
  { year: "1997", value: 8, month: "Mar" },
  { year: "1993", value: 1, month: "Apr" },
  { year: "1994", value: 3, month: "Apr" },
  { year: "1996", value: 2, month: "Apr" },
  { year: "1997", value: 4, month: "Apr" },
  { year: "1995", value: 4, month: "May" },
  { year: "1996", value: 6, month: "May" },
  { year: "1997", value: 3, month: "May" },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May"];

export const LineChart: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useThemeContext();
  const [selectedMonth, setSelectedMonth] = useState("Jan");

  const filteredData =
    selectedMonth === "all"
      ? rawData
      : rawData.filter((item) => item.month === selectedMonth);

  const axisTextColor = isDarkMode ? "#aab4c8" : "#555555";
  const gridColor = isDarkMode ? "#3a4556" : "#e0e0e0";

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
        style: { fill: axisTextColor, fontSize: 12 },
      },
      line: {
        style: { stroke: gridColor },
      },
      tickLine: null,
    },
    yAxis: {
      label: {
        style: { fill: axisTextColor, fontSize: 12 },
      },
      grid: {
        line: {
          style: { stroke: gridColor, lineWidth: 1, lineDash: [4, 4] },
        },
      },
    },
    point: {
      size: 4,
      shape: "circle",
      style: {
        fill: isDarkMode ? "#4880FF" : "#4880FF",
        stroke: "#FFFFFF",
        lineWidth: 2,
      },
    },
    area: {
      style: {
        fillOpacity: 0.15,
      },
    },
    color: "#4880FF",
    tooltip: {
      showMarkers: true,
    },
    lineStyle: {
      lineWidth: 2.5,
    },
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Title level={4} style={{ margin: 0, color: "var(--text-h)" }}>
            {t("SALES_DETAILS")}
          </Title>

          <Select
            value={selectedMonth}
            onChange={(value) => setSelectedMonth(value)}
            style={{ width: 120 }}
            options={months.map((m) => ({ label: m, value: m }))}
          />
        </div>
        <div style={{ height: 320 }}>
          <Line {...config} autoFit key={isDarkMode ? "dark" : "light"} />
        </div>
      </Card>
    </div>
  );
};