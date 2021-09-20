import faker from 'faker';
import { TAccount } from '@/type/account';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Modal, Space } from 'antd';
import AccountForm from '../account/components/AccountForm';
import CoursingForm from './components/CoursingForm';

const ACCOUNT_LIST: Partial<TAccount>[] = [...Array(20)].map((_, index: number) => {
  return {
    id: faker.datatype.number(),
    coursingTitle: faker.vehicle.vehicle(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    gender: 'female',
    role: faker.random.arrayElement(['admin', 'moderator']),
    username: faker.internet.userName(),
  };
});

const CoursingListPage = () => {
  const handleDelete = (accountId: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      onOk: () => {},
    });
  };

  const columns: ProColumns[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      hideInSearch: true,
    },
    {
      title: 'Tên',
      dataIndex: 'coursingTitle',
    },
    {
      title: 'Hành động',
      width: 200,
      valueType: 'option',
      align: 'center',
      render: (_, data) => (
        <Space>
          <Button type="text" danger onClick={() => handleDelete(data.id)}>
            Xóa
          </Button>
          <ModalForm
            initialValues={data}
            title="Cập nhật môn học"
            trigger={
              <Button type="link" key="create">
                Chi tiết
              </Button>
            }
            onFinish={(values) => {
              console.log(values);
              return new Promise((res) => res(true));
            }}
          >
            <CoursingForm />
          </ModalForm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        search={{
          layout: 'vertical',
        }}
        toolBarRender={() => [
          <ModalForm
            title="Tạo mới môn học"
            trigger={
              <Button key="create" type="primary">
                Thêm môn học
              </Button>
            }
            onFinish={(values) => {
              console.log(values);
              return new Promise((res) => res(true));
            }}
          >
            <CoursingForm />
          </ModalForm>,
        ]}
        dataSource={ACCOUNT_LIST}
        columns={columns}
      />
    </PageContainer>
  );
};

export default CoursingListPage;
