import faker from 'faker';
import { TAccountRole } from '@/type/constants';
import { TAccount } from '@/type/account';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Modal, Space } from 'antd';
import { Link } from 'umi';
import ProForm, { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import AccountForm from './components/AccountForm';
import tutorApi from '@/api/tutor';
import { buildParamsWithPro } from '@/api/utils';

faker.locale = 'vi';

interface Props {}

const ACCOUNT_LIST: Partial<TAccount>[] = [...Array(20)].map((_, index: number) => {
  return {
    id: faker.datatype.number(),
    fullName: faker.name.findName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    gender: 'female',
    role: faker.random.arrayElement(['admin', 'moderator']),
    username: faker.internet.userName(),
  };
});

const AccountListPage = (props: Props) => {
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
      hideInSearch: true,
    },
    {
      title: 'Tên',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      hideInSearch: true,
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      valueType: 'select',
      valueEnum: {
        administrator: {
          text: 'Admin',
        },
        moderator: {
          text: 'Moderator',
        },
      },
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
            title="Cập nhật tài khoản"
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
            <AccountForm updateMode />
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
            title="Tạo mới tài khoản"
            trigger={
              <Button key="create" type="primary">
                Thêm tài khoản
              </Button>
            }
            onFinish={(values) => {
              console.log(values);
              return new Promise((res) => res(true));
            }}
          >
            <AccountForm />
          </ModalForm>,
        ]}
        request={(...params) =>
          tutorApi.get(buildParamsWithPro(...params)).then((res) => ({
            data: res.data.items,
            total: res.data.items.length,
          }))
        }
        columns={columns}
      />
    </PageContainer>
  );
};

export default AccountListPage;
