import blogPostApi from '@/api/blog-post';
import { buildParamsWithPro } from '@/api/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Modal, Space, Tag } from 'antd';
import faker from 'faker';
import { useRef } from 'react';
import { history, Link } from 'umi';

faker.locale = 'vi';

const BlogPostListPage = () => {
  const ref = useRef<ActionType>();
  const handleDeleteBlogpost = async (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa?',
      content: 'Bài viết này sẽ bị xóa khỏi hệ thống',
      onOk: () => {
        return blogPostApi.delete(id).then(() => ref.current?.reload());
      },
    });
  };

  const goodsColumns: ProColumns[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      search: false,
      sorter: true,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Banner',
      dataIndex: ['banner', 'url'],
      valueType: 'image',
      search: false,
    },
    {
      title: 'Tên bài viết',
      dataIndex: 'title',
    },
    {
      title: 'Thẻ',
      dataIndex: 'tags',
      search: false,
      render: (_, { tags }) => (
        <Space>
          {tags?.split(',').map((t: string) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Miêu tả',
      dataIndex: 'detail',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: 'Hành động',
      width: 200,
      valueType: 'option',
      align: 'center',
      render: (_, data) => (
        <Space direction="horizontal">
          <Button danger type="link" onClick={() => handleDeleteBlogpost(data.id)}>
            Xóa bài viết
          </Button>
          <Divider type="vertical" />
          <Link to={`/admin/blog-post/${data.id}`}>Cập nhật</Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => history.push('/admin/blog-post/create')}
            icon={<PlusOutlined />}
          >
            Thêm BlogPost
          </Button>,
        ]}
        columns={goodsColumns}
        request={(...params) =>
          blogPostApi.get(buildParamsWithPro(...params)).then((res) => ({
            data: res.data.items,
            total: res.data.items.length,
          }))
        }
      />
    </PageContainer>
  );
};

export default BlogPostListPage;
