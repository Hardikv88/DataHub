import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { getAntdTheme } from './theme/theme';
import AppRoutes from './routes/AppRoutes';
import { ThemeProvider, useThemeContext } from './theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import ReloadPrompt from './components/common/ReloadPrompt';
import OfflineStatus from './components/common/OfflineStatus';

function AppContent() {
  const { isDarkMode } = useThemeContext();
  const { i18n } = useTranslation();
  
  const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

  return (
    <ConfigProvider 
      theme={getAntdTheme(isDarkMode)}
      direction={direction}
    >
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ReloadPrompt />
      <OfflineStatus />
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
