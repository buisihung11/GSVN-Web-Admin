import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ResoEditor from '@/components/ResoEditor/ResoEditor';

import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import blogPostApi from '@/api/blog-post';

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
            await blogPostApi.create(values);
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
              name="title"
              width="md"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormTextArea label="Miêu tả bài viết" name="detail" width="md" />
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
