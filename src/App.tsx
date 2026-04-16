import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { antdTheme } from './theme/theme';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
