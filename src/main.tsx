import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ConfigProvider from "antd/es/config-provider/index";
import { AuthProvider } from "./context/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      token: {
        fontFamily: "'Nunito Sans', system-ui, -apple-system, sans-serif",
      },
    }}
  >
    <AuthProvider>
      <App />
    </AuthProvider>
  </ConfigProvider>,
);
