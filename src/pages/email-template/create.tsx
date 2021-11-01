import emailTemplateApi from '@/api/emailTemplate';
import { EmailTemplate } from '@/type/email-template';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { columns } from './columns';

const CreateEmailTemplatePage = () => {
  const handleCreateEmailTemplate = async (values: EmailTemplate) => {
    await emailTemplateApi.create(values);
    return true;
  };

  return (
    <PageContainer>
      <Card>
        <BetaSchemaForm
          submitter={{
            searchConfig: {
              submitText: 'Tạo',
            },
          }}
          onFinish={handleCreateEmailTemplate}
          columns={columns}
        />
      </Card>
    </PageContainer>
  );
};

export default CreateEmailTemplatePage;
