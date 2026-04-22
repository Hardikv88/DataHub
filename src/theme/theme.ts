import { theme } from 'antd';
import { Colors } from './colors';

export const getAntdTheme = (isDarkMode: boolean) => ({
  algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  token: {
    colorPrimary: Colors.primary,
    fontFamily: '"Nunito Sans", sans-serif',
    borderRadius: 8,
    colorBgLayout: isDarkMode ? Colors.bgDark : Colors.bgLight,
    colorBgContainer: isDarkMode ? Colors.surfaceDark : Colors.surfaceLight,
    colorTextBase: isDarkMode ? Colors.textDark : Colors.textLight,
  },
  components: {
    Layout: {
      siderBg: isDarkMode ? Colors.sidebarDark : Colors.sidebarLight,
      headerBg: isDarkMode ? Colors.surfaceDark : Colors.surfaceLight,
    },
    Menu: {
      darkItemBg: Colors.sidebarDark,
      itemBg: isDarkMode ? Colors.sidebarDark : Colors.sidebarLight,
      itemColor: isDarkMode ? Colors.textDark : Colors.textLight,
      itemSelectedColor: Colors.primary,
      itemSelectedBg: isDarkMode ? 'rgba(72, 128, 255, 0.1)' : 'rgba(72, 128, 255, 0.1)',
    }
  }
});
