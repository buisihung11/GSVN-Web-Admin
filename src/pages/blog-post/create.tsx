import blogPostApi from '@/api/blog-post';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import UploadFile from '@/components/Upload/UploadFile';
import { PostType } from '@/type/blog-post';
import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { useHistory } from 'react-router';

const CreateBlogPage = () => {
  const { push } = useHistory();
  const onCreatePost = async (values: any) => {
    const data = { ...values };
    data.tags = data.tags?.join(',');
    console.log(`data`, data);
    const res = await blogPostApi.create(data);
    push(`/admin/blog-post/${res.data.id}`);
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
          <ProForm.Group>
            <ProForm.Item label="Ảnh bìa" name={['banner', 'url']}>
              <UploadFile accept="image/*" style={{ height: '100%', width: '400px' }} />
            </ProForm.Item>
            <ProFormText label="Slug" name="slug" width="md" />
          </ProForm.Group>
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
            <ProFormSelect
              label="Loại bài viết"
              options={Object.values(PostType)}
              name="class"
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
