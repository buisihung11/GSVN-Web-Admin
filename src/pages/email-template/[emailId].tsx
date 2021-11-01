import emailTemplateApi from '@/api/emailTemplate';
import { TCourse } from '@/type/course';
import { EmailTemplate } from '@/type/email-template';
import useRequest from '@ahooksjs/use-request';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Empty } from 'antd';
import { IRouteComponentProps } from 'umi';
import { columns } from './columns';

const UpdateEmailTemplatePage = ({ match }: IRouteComponentProps<{ emailId: string }>) => {
  const {
    params: { emailId },
  } = match;

  console.log(`emailId`, emailId);
  const { data } = useRequest<TCourse>(
    () => emailTemplateApi.getById(+emailId),

    {
      ready: Boolean(emailId),
    },
  );

  const emailTemplate = data as TCourse;

  const handleUpdateEmailTemplate = async (values: EmailTemplate) => {
    await emailTemplateApi.update(emailTemplate?.id, values);
    return true;
  };

  // if (loading) {
  //   return <Spin />;
  // }

  if (!emailTemplate) {
    return <Empty description="không tìm thấy Khóa học" />;
  }

  return (
    <PageContainer>
      <Card>
        <BetaSchemaForm
          initialValues={emailTemplate}
          submitter={{
            searchConfig: {
              submitText: 'Cập nhật',
            },
          }}
          onFinish={handleUpdateEmailTemplate}
          columns={columns}
        />
      </Card>
    </PageContainer>
  );
};

export default UpdateEmailTemplatePage;
