import appSettingApi from '@/api/appsetting';
import { TAppSetting } from '@/type/appsetting';
import { ErrorResponse } from '@/type/response';
import { BetaSchemaForm, ProFormUploadDragger } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, notification, Select } from 'antd';

interface Props {}

const SettingPage = () => {
  // TODO: Call api to get app config
  // TODO: Update handler
  const updateHandler = (values: TAppSetting) => {
    console.log(`values`, values);
    return appSettingApi
      .updateAppSetting(values)
      .then(() =>
        notification.success({
          message: 'Cập nhật thành công',
        }),
      )
      .catch((err) => {
        console.log(`err`, err);
        notification.error({
          message: err,
        });
      });
  };

  return (
    <PageContainer>
      <Card>
        <BetaSchemaForm
          onFinish={updateHandler}
          columns={[
            {
              valueType: 'group',
              title: 'Cấu hình SEO',
              columns: [
                {
                  title: 'Banner',
                  dataIndex: ['banner', 'url'],
                  width: 'md',
                  renderFormItem: (formProps) => (
                    <ProFormUploadDragger
                      title="Hình ảnh"
                      description="Kéo thả hình ảnh vào đây"
                      width="md"
                      name={formProps.dataIndex}
                    />
                  ),
                },
                {
                  valueType: 'group',
                  columns: [
                    {
                      title: 'Tên trang web',
                      dataIndex: 'metaTitle',
                      width: 'lg',
                    },
                    {
                      title: 'Từ khóa',
                      dataIndex: 'metaKeywords',
                      width: 'lg',
                      renderFormItem: () => <Select mode="tags" tokenSeparators={[',']} />,
                    },
                  ],
                },
                {
                  title: 'Miêu tả',
                  dataIndex: 'metaDescription',
                  valueType: 'textarea',
                  width: 'lg',
                },
              ],
            },
            {
              valueType: 'divider',
            },
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default SettingPage;
