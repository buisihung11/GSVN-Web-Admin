import { TCourse } from '@/type/course';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Avatar, Button, Divider, Space, Typography } from 'antd';
import faker from 'faker';
import { Link, history } from 'umi';

interface Props {}

const CourseListPage = (props: Props) => {
  const fakeApi = () =>
    [...new Array(30)].map<TCourse>((_, idx) => ({
      id: idx,
      title: faker.random.words(),
      description: faker.lorem.paragraphs(),
      duration: faker.datatype.number(20),
      durationUnit: faker.random.arrayElement(['tuần', 'ngày']),
      amount: +faker.commerce.price(),
      teachForm: 'online',
      mentor: faker.name.findName(),
      benefits: ['Giấy chứng nhận'],
      banner: {
        url: faker.image.city(),
      },
    }));

  const columns: ProColumns[] = [
    {
      title: 'Banner',
      dataIndex: ['banner', 'url'],
      width: 250,
      render: (value) => (
        <Avatar shape="square" src={value} style={{ width: '80%', height: 'auto' }} />
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: 'Miêu tả',
      dataIndex: 'description',
      hideInSearch: true,
      width: 300,
      render: (value) => (
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
          }}
        >
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Độ dài khóa học',
      dataIndex: 'duration',
      valueType: 'digit',
      render: (duration, { durationUnit }) => (
        <span>
          {duration} {durationUnit}
        </span>
      ),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'amount',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: 'Hình thức dạy',
      dataIndex: 'teachForm',
      hideInSearch: true,
    },
    {
      title: 'Hành động',
      valueType: 'option',
      align: 'center',
      render: () => (
        <Space direction="horizontal">
          <Button danger type="link">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<TCourse>
        scroll={{
          x: 600,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => history.push('/course/create')}
            icon={<PlusOutlined />}
          >
            Thêm khóa học
          </Button>,
        ]}
        request={() =>
          new Promise((res) =>
            res({
              data: fakeApi(),
              total: fakeApi().length,
              success: true,
            }),
          )
        }
        columns={columns}
      />
    </PageContainer>
  );
};

export default CourseListPage;
