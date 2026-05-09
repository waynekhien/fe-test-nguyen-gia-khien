import type { ReactNode } from "react";
import AntdProvider from "./AntdProvider";
import StoreProvider from "./StoreProvider";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <StoreProvider>
      <AntdProvider>{children}</AntdProvider>
    </StoreProvider>
  );
};

export default AppProvider;
