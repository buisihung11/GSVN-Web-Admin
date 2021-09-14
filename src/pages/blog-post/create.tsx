import ProForm, { ProFormText } from '@ant-design/pro-form';
import ResoEditor from '@/components/ResoEditor/ResoEditor';

import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

interface Props {}

const CreateBlogPage = (props: Props) => {
  return (
    <PageContainer>
      <Card>
        <ProForm
          submitter={{
            searchConfig: {
              submitText: 'Tạo',
            },
          }}
          onFinish={async (values) => {
            console.log(values);
            return true;
          }}
        >
          <ProForm.Group>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên bài viết',
                },
              ]}
              label="Tên bài viết"
              name="name"
              width="md"
            />
          </ProForm.Group>
          <ProForm.Item label="Nội dung bài viết" name="content">
            <ResoEditor />
          </ProForm.Item>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CreateBlogPage;
