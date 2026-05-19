import React, { useState, useEffect } from 'react';
import { Alert } from 'antd';
import { WifiOutlined } from '@ant-design/icons';

const OfflineStatus: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: 'auto',
      minWidth: '300px'
    }}>
      <Alert
        message="You are currently offline"
        description="Some features may be unavailable, but you can still browse cached data."
        type="warning"
        showIcon
        icon={<WifiOutlined />}
        closable
      />
    </div>
  );
};

export default OfflineStatus;
