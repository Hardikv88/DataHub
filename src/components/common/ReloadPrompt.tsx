import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button, notification } from 'antd';
import { CloudSyncOutlined } from '@ant-design/icons';

const ReloadPrompt: React.FC = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  React.useEffect(() => {
    if (offlineReady) {
      notification.success({
        message: 'App Ready Offline',
        description: 'The application is now ready to work offline.',
        placement: 'bottomRight',
      });
    }
  }, [offlineReady]);

  React.useEffect(() => {
    if (needRefresh) {
      const key = `update-${Date.now()}`;
      notification.info({
        key,
        message: 'New Version Available',
        description: 'A new version of DataHub is available. Refresh to update?',
        placement: 'bottomRight',
        icon: <CloudSyncOutlined style={{ color: '#4880FF' }} />,
        duration: 0,
        btn: (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="default" size="small" onClick={() => {
              close();
              notification.destroy(key);
            }}>
              Ignore
            </Button>
            <Button type="primary" size="small" onClick={() => {
              updateServiceWorker(true);
              notification.destroy(key);
            }}>
              Update
            </Button>
          </div>
        ),
      });
    }
  }, [needRefresh, updateServiceWorker]);

  return null;
};

export default ReloadPrompt;
