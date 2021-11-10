import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Gia Sư Việt Nam',
  pwa: true,
  logo: process.env.NODE_ENV === 'production' ? '/admin/gsvn-logo.png' : '/gsvn-log.png',
  iconfontUrl: '',
};

export default Settings;
