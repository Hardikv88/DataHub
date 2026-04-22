import React from 'react';
import { Typography } from 'antd';
import { Card } from '../../components/common/Card';

const { Title } = Typography;

export const Customers: React.FC = () => {
  return (
    <div>
      <h1 className="dashboard-heading">Customers</h1>
      <Card>
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Title level={3} style={{ color: 'var(--text)' }}>Customers Module Area</Title>
        </div>
      </Card>
    </div>
  );
};
