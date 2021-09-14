import tutorApi from '@/api/tutor';
import { TutorStatus } from '@/type/constants';
import type { TTutor } from '@/type/tutor';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Alert, Button, Divider, Space } from 'antd';
import faker from 'faker';
import { useState } from 'react';
import { Link } from 'umi';

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

const TutorListPage = () => {
  const [currentTutor, setCurrentTutor] = useState<TTutor | null>(null);

  const handleApproveTutor = async (data: { detail: string }) => {
    if (currentTutor) {
      await tutorApi.updateTutorStatus(currentTutor?.id, {
        detail: data.detail,
        status: TutorStatus.APPROVED,
      });
    }
    return true;
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
      title: 'Trạng thái',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        [TutorStatus.NEW]: {
          text: 'Mới',
          status: 'warning',
        },
      },
    },
    {
      title: 'Hành động',
    width: 200,
    valueType: 'option',
      render: (_, data) => (
        <Space direction="horizontal">
          <Button type="link" onClick={() => setCurrentTutor(data)}>
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
      <ModalForm
        visible={Boolean(currentTutor)}
        onVisibleChange={(visible) => !visible && setCurrentTutor(null)}
        title={`Xác nhận xét duyệt cho ${currentTutor?.fullName}?`}
        onFinish={handleApproveTutor}
      >
        <Alert showIcon message="Cho phép giảng viên bắt đầu nhận đơn hàng." type="info" />
        <ProFormTextArea
          name="detail"
          label="Nội dung"
          placeholder="Giảng viên tiềm năng..."
          width="md"
        />
      </ModalForm>
      <ProTable dataSource={TUTOR_LISTS} columns={goodsColumns} />
    </PageContainer>
  );
};

export default TutorListPage;
