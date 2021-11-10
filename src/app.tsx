import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { SettingOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { Button, Result } from 'antd';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import { AuthUser } from './@types/authentication';
import { getSession, isValidToken } from './utils/jwt';
import { getUserInfo } from './utils/utils';

const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: AuthUser;
  fetchUserInfo?: () => Promise<AuthUser | undefined>;
  isAuthenticated: boolean;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = JSON.parse(getUserInfo()!);
      return currentUser as AuthUser;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const currentUser = await fetchUserInfo();
  const isAuthentited = currentUser && isValidToken(getSession()!);
  if (history.location.pathname !== loginPath) {
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
      isAuthenticated: Boolean(isAuthentited),
    };
  }

  return {
    currentUser,
    fetchUserInfo,
    settings: {},
    isAuthenticated: Boolean(isAuthentited),
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // if (!initialState?.isAuthenticated && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    breadcrumbRender: (routers = []) => [
      {
        path: '/',
        breadcrumbName: 'Trang chủ',
      },
      ...routers,
    ],
    links: [
      <Link to="/admin/setting">
        <SettingOutlined />
        <span>Cấu hình</span>
      </Link>,
    ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    unAccessible: (
      <Result
        status="403"
        title="403"
        subTitle="Không có quyền truy cập"
        extra={<Button type="primary">Back Home</Button>}
      />
    ),
    ...initialState?.settings,
  };
};
