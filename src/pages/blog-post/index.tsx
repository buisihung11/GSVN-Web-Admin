import blogPostApi from '@/api/blog-post';
import { buildParamsWithPro } from '@/api/utils';
import { TutorStatus } from '@/type/constants';
import type { TTutor } from '@/type/tutor';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Modal, Space } from 'antd';
import faker from 'faker';
import { useRef } from 'react';
import { history, Link } from 'umi';

faker.locale = 'vi';

const TUTOR_LISTS: Partial<TTutor>[] = [...Array(20)].map(() => {
  return {
    id: faker.datatype.number(),
    avatar: {
      url: 'https://d21xzygesx9h0w.cloudfront.net/TUTOROO-Russian-Tutor-Singapore-Lana-1040.jpg',
    },
    fullName: faker.name.findName(),
    pricePerHouse: +faker.finance.amount(150, 250),
    rate: +faker.finance.amount(0, 5),
    totalHourRemain: faker.datatype.number(20),
    totalReview: faker.datatype.number(30),
    teachForm: 'both',
    badge: {
      id: faker.datatype.number(),
      title: 'Diamond',
    },
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    groupRate: 200,
    about: faker.lorem.paragraph(2),
    gender: 'female',
    address: faker.address.cityName(),
    status: TutorStatus.NEW,
  };
});

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
    },
    {
      title: 'Tên bài viết',
      dataIndex: 'fullName',
      key: 'name',
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
      render: (_, data) => (
        <Space direction="horizontal">
          <Button danger type="link" onClick={() => handleDeleteBlogpost(data.id)}>
            Xóa bài viết
          </Button>
          <Divider type="vertical" />
          <Link to={`/tutor/${data.id}`}>Chi tiết</Link>
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
            data: res.data,
            total: res.data.length,
          }))
        }
      />
    </PageContainer>
  );
};

export default BlogPostListPage;
