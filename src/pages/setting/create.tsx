import configurationApi from '@/api/configuration';
import ProForm, { BetaSchemaForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { columns } from './configurationColumns';

const CreateConfigurationPage = () => {
  const handleCreateConfiguration = async (values: any) => {
    await configurationApi.createConfiguration(values?.version, { ...values });
    return true;
  };

  return (
    <PageContainer title="Tạo cấu hình">
      <Card>
        <ProForm
          submitter={{
            searchConfig: {
              submitText: 'Tạo',
            },
          }}
          onFinish={handleCreateConfiguration}
        >
          <BetaSchemaForm layoutType="Embed" columns={columns} />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CreateConfigurationPage;
