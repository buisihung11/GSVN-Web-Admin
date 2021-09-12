import faker from 'faker';
import type { TTutor } from '@/type/tutor';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Divider, Modal, Space } from 'antd';
import { Link } from 'umi';

faker.locale = 'vi';

const TUTOR_LISTS: Partial<TTutor>[] = [...Array(20)].map((_, index: number) => {
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
  };
});

const TutorListPage = () => {
  const handleApproveTutor = (tutor: TTutor) => {
    Modal.confirm({
      title: `Xác nhận xét duyệt cho ${tutor.fullName}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Cho phép giảng viên bắt đầu nhận đơn hàng.',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
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
      title: 'Tên giảng viên',
      dataIndex: 'fullName',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true,
      ellipsis: true,
    },
    {
      title: 'Hành động',
      width: 200,
      valueType: 'option',
      render: (_, data) => (
        <Space direction="horizontal">
          <Button type="link" onClick={() => handleApproveTutor(data)}>
            Xét duyệt
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
        dataSource={TUTOR_LISTS}
        columns={goodsColumns}
      />
    </PageContainer>
  );
};

export default TutorListPage;
