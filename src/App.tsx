import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getAntdTheme } from './theme/theme';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider, useThemeContext } from './theme/ThemeContext';

function AppContent() {
  const { isDarkMode } = useThemeContext();
  
  return (
    <ConfigProvider theme={getAntdTheme(isDarkMode)}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
