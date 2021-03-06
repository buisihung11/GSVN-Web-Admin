import ProForm, { ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ResoEditor from '@/components/ResoEditor/ResoEditor';

import { IRouteComponentProps } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Empty, Spin } from 'antd';
import blogPostApi from '@/api/blog-post';
import useRequest from '@ahooksjs/use-request';
import UploadFile from '@/components/Upload/UploadFile';
import { PostType, TBlogPost } from '@/type/blog-post';
import { merge } from 'lodash';

const UpdateBlogPage = ({ match }: IRouteComponentProps<{ blogpostId: string }>) => {
  const {
    params: { blogpostId },
  } = match;

  const { data: blogpost, loading } = useRequest(
    () => blogPostApi.getById(+blogpostId).then((res) => res.data),
    {
      ready: Boolean(blogpostId),
    },
  );

  const updatePost = async (values: TBlogPost) => {
    const data = merge(blogpost, values);
    data.tags = (data.tags as any)?.join(',');
    console.log(`data`, data);
    await blogPostApi.update(blogpostId, data);
    return true;
  };

  if (loading) {
    return <Spin />;
  }

  if (!blogpost) {
    return <Empty description="không tìm thấy bài viết" />;
  }

  return (
    <PageContainer>
      <Card>
        <ProForm
          initialValues={{
            ...blogpost,
            bannerId: blogpost?.banner?.id,
            tags: blogpost.tags?.split(','),
          }}
          submitter={{
            searchConfig: {
              submitText: 'Cập nhật',
            },
          }}
          onFinish={updatePost}
        >
          <ProFormText hidden name="bannerId" />
          <ProFormText hidden name="id" />
          <ProFormText hidden name={['banner', 'id']} />
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

export default UpdateBlogPage;
