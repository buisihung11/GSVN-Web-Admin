import configurationApi from '@/api/configuration';
import { TCourse } from '@/type/course';
import useRequest from '@ahooksjs/use-request';
import ProForm, { BetaSchemaForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Empty } from 'antd';
import { AxiosResponse } from 'axios';
import { IRouteComponentProps } from 'umi';
import { columns } from './configurationColumns';

const normalizeConfiguration = (data: any) => {
  const normalized = { ...data };
  const parsedData = JSON.parse(data.value) ?? {};
  return { ...normalized, ...parsedData };
};

const UpdateConfigurationPage = ({ match }: IRouteComponentProps<{ versionId: string }>) => {
  const {
    params: { versionId },
  } = match;

  const { data } = useRequest<AxiosResponse<TCourse>>(
    () => configurationApi.getById(+versionId),

    {
      ready: Boolean(versionId),
      formatResult: (res) => res.data,
    },
  );

  const configutaion = data as TCourse;

  const handleUpdateConfiguration = async (values: any) => {
    console.log(`values`, values);
    await configurationApi.createConfiguration(values?.version, { ...configutaion, ...values });
    return true;
  };

  if (!configutaion) {
    return <Empty description="không tìm thấy Khóa học" />;
  }

  return (
    <PageContainer>
      <Card>
        <ProForm
          initialValues={normalizeConfiguration(configutaion)}
          submitter={{
            searchConfig: {
              submitText: 'Cập nhật',
            },
          }}
          onFinish={handleUpdateConfiguration}
        >
          <BetaSchemaForm initialValues={configutaion} layoutType="Embed" columns={columns} />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default UpdateConfigurationPage;
