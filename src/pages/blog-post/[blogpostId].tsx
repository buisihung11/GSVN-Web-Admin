import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ResoEditor from '@/components/ResoEditor/ResoEditor';

import { IRouteComponentProps } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Empty, Spin } from 'antd';
import blogPostApi from '@/api/blog-post';
import useRequest from '@ahooksjs/use-request';

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
          initialValues={blogpost}
          submitter={{
            searchConfig: {
              submitText: 'Cập nhật',
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

export default UpdateBlogPage;
