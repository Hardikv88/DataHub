import React from 'react';
import { Typography } from 'antd';
import { Card } from '../../components/common/Card';

const { Title } = Typography;

export const Settings: React.FC = () => {
  return (
    <div>
      <h1 className="dashboard-heading">Settings</h1>
      <Card>
        <div style={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Title level={3} style={{ color: 'var(--text)' }}>Settings Module Area</Title>
        </div>
      </Card>
    </div>
  );
};
