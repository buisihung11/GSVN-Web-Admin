// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      component: './wrappers/auth',
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/',
      redirect: '/tutor',
    },
    {
      path: '/admin',
      redirect: '/admin/tutor',
    },
    {
      path: '/admin/tutor',
      icon: 'idcard',
      name: 'tutor',
      access: 'canAdmin',
      routes: [
        {
          path: '/admin/tutor/:tutorId',
          component: './tutor/[tutorId]',
        },
        {
          path: '/admin/tutor',
          exact: true,
          component: './tutor',
        },
      ],
    },
    {
      path: '/admin/badge',
      icon: 'safety',
      name: 'badge',
      access: 'canAdmin',
      routes: [
        {
          path: '/admin/badge',
          exact: true,
          component: './badge',
        },
      ],
    },
    {
      path: '/admin/blog-post',
      icon: 'book',
      name: 'blog-post',
      access: 'canAdmin',
      routes: [
        // {
        //   path: '/admin/tutor/:tutorId',
        //   component: './tutor/[tutorId]',
        // },
        {
          path: '/admin/blog-post/create',
          component: './blog-post/create',
        },
        {
          path: '/admin/blog-post',
          exact: true,
          component: './blog-post',
        },
      ],
    },
    {
      path: '/admin/orders',
      icon: 'carry-out',
      name: 'order',
      component: './order',
      access: 'canAdmin',
    },
    {
      path: '/admin/course',
      icon: 'read',
      name: 'course',
      access: 'canAdmin',
      routes: [
        {
          path: '/admin/course/create',
          component: './course/create',
        },
        {
          path: '/admin/course',
          exact: true,
          component: './course',
        },
      ],
    },
    {
      path: '/admin/coursing',
      icon: 'tags',
      name: 'coursing',
      component: './coursing',
      access: 'canAdmin',
    },
    {
      path: '/admin/account',
      icon: 'user',
      name: 'account',
      component: './account',
      access: 'canAdmin',
    },
    {
      path: '/admin/email-template',
      icon: 'mail',
      name: 'email-template',
      component: './account',
      access: 'canAdmin',
    },
    {
      path: '/admin/setting',
      name: 'setting',
      component: './setting',
      hideInMenu: true,
      access: 'canAdmin',
    },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
