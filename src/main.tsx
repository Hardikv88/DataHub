import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "./i18n/config";
import ConfigProvider from "antd/es/config-provider/index";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./storage/Store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
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
      </ConfigProvider>
      ,
    </PersistGate>
  </Provider>,
);
