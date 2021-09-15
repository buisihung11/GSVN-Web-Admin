import { DefaultFooter } from '@ant-design/pro-layout';
import { useIntl } from 'umi';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '蚂蚁集团体验技术部出品',
  });

  return (
    <DefaultFooter
      copyright={`2021`}
      links={[
        {
          key: 'GSVN',
          title: 'GSVN',
          href: 'https://gsvn-deploy.vercel.app/',
          blankTarget: true,
        },
      ]}
    />
  );
};
