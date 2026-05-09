import { useState } from "react";
import { ProLayout } from "@ant-design/pro-components";
import type { ProLayoutProps } from "@ant-design/pro-components";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  ProjectOutlined,
  SunOutlined,
  MoonOutlined,
  // MenuFoldOutlined,
  // MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Dropdown, Button, theme } from "antd";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleTheme, selectIsDarkMode } from "../store/slices/themeSlice";
import type { MenuProps } from "antd";

const defaultMenus: ProLayoutProps["route"] = {
  path: "/",
  routes: [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      path: "/tasks",
      name: "Tasks",
      icon: <ProjectOutlined />,
    },
  ],
};

const getThemeMenuItems = (
  isDarkMode: boolean,
  colorPrimary: string,
): MenuProps["items"] => {
  const activeStyle: React.CSSProperties = {
    backgroundColor: colorPrimary,
    color: "#fff",
    borderRadius: 6,
  };

  return [
    {
      key: "light",
      icon: <SunOutlined />,
      label: "Light",
      style: !isDarkMode ? activeStyle : undefined,
    },
    {
      key: "dark",
      icon: <MoonOutlined />,
      label: "Dark",
      style: isDarkMode ? activeStyle : undefined,
    },
  ];
};

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const { token } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const themeMenuProps: MenuProps = {
    items: getThemeMenuItems(isDarkMode, token.colorPrimary),
    selectedKeys: [isDarkMode ? "dark" : "light"],
    onClick: () => dispatch(toggleTheme()),
  };

  return (
    <ProLayout
      title="Task Board"
      logo="/favicon.svg"
      layout="mix"
      fixSiderbar
      collapsed={collapsed}
      onCollapse={setCollapsed}
      collapsedButtonRender={false}
      route={defaultMenus}
      location={{ pathname: location.pathname }}
      menuItemRender={(item, dom) => <Link to={item.path || "/"}>{dom}</Link>}
      onMenuHeaderClick={() => navigate("/")}
      token={{
        sider: {
          colorBgMenuItemSelected: token.colorPrimaryBg,
          colorTextMenuSelected: token.colorPrimary,
        },
      }}
      actionsRender={() => [
        <Dropdown key="theme-dropdown" menu={themeMenuProps}>
          <Button
            size="large"
            type="text"
            icon={isDarkMode ? <MoonOutlined /> : <SunOutlined />}
          />
        </Dropdown>,
      ]}
    >
      <Outlet />
    </ProLayout>
  );
};

export default AdminLayout;
