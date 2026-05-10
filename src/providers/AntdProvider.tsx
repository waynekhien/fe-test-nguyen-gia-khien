import { ConfigProvider, App as AntdApp, theme } from "antd";
import enUS from "antd/locale/en_US";
import { ProConfigProvider, enUSIntl } from "@ant-design/pro-components";
import type { ReactNode } from "react";
import { selectIsDarkMode } from "../store/slices/themeSlice";
import { useAppSelector } from "../store";

interface AntdProviderProps {
  children: ReactNode;
}

const AntdProvider = ({ children }: AntdProviderProps) => {
  const isDarkMode = useAppSelector(selectIsDarkMode);

  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 6,
          ...(isDarkMode && {
            colorBgContainer: "#1f1f1f",
            colorBgElevated: "#262626",
            colorBgLayout: "#141414",
          }),
        },
      }}
    >
      <ProConfigProvider intl={enUSIntl}>
        <AntdApp>{children}</AntdApp>
      </ProConfigProvider>
    </ConfigProvider>
  );
};

export default AntdProvider;
