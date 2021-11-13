import Footer from '@/components/Footer';
import useAuth from '@/hooks/useAuth';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, Space, Typography, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { FormattedMessage, history, Link, SelectLang, useIntl } from 'umi';
import styles from './index.less';

const goto = (root: string) => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    location.href = redirect || root;
  }, 10);
};

const Login: React.FC = () => {
  const { login, isAuthenticated, user, loginWithGoogle, isInitialized } = useAuth();

  const [submitting, setSubmitting] = useState(false);

  const intl = useIntl();

  useEffect(() => {
    if (!isInitialized && isAuthenticated && user?.role) {
      const userRole = user?.role;
      setSubmitting(true);
      if (userRole === 'Administrator') {
        goto('/admin');
      } else if (userRole === 'Moderator') {
        goto('/moderator');
      }
      setSubmitting(false);
    }
  }, [isInitialized, isAuthenticated, user?.role]);

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      await login(values.username!, values.password!);
      const defaultloginSuccessMessage = 'Đăng nhập thành công';
      message.success(defaultloginSuccessMessage);
      return;
    } catch (error) {
      message.error((error as any).message);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/gsvn-logo.png" />
            </Link>
          </div>
        </div>
        <div style={{ height: '24px' }} />
        <div className={styles.main}>
          <ProForm
            initialValues={{
              autoLogin: true,
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                style: {
                  width: '100%',
                },
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as API.LoginParams);
            }}
          >
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          </ProForm>
          <Space className={styles.other}>
            <Typography.Text>Đăng nhập với</Typography.Text>
            <Button type="link" icon={<GoogleOutlined />} onClick={loginWithGoogle} />
          </Space>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
