import blogPostApi from '@/api/blog-post';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import UploadFile from '@/components/Upload/UploadFile';
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

const CreateBlogPage = () => {
  const onCreatePost = async (values: any) => {
    const data = { ...values };
    data.tags = data.tags?.join(',');
    console.log(`data`, data);
    await blogPostApi.create(data);
    return true;
  };

  return (
    <PageContainer>
      <Card>
        <ProForm
          submitter={{
            searchConfig: {
              submitText: 'Tạo',
            },
          }}
          onFinish={onCreatePost}
        >
          <ProForm.Item label="Ảnh bìa" name={['banner', 'url']}>
            <UploadFile accept="image/*" style={{ height: '100%', width: '400px' }} />
          </ProForm.Item>
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
            <ProFormSelect
              label="Thẻ"
              name="tags"
              mode="tags"
              width="md"
              options={['Tutor', 'Student']}
              fieldProps={{
                tokenSeparators: [','],
              }}
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
