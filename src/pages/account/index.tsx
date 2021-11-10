import tutorApi from '@/api/tutor';
import userApi from '@/api/user';
import { buildParamsWithPro } from '@/api/utils';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import { useRef } from 'react';
import AccountForm from './components/AccountForm';

const AccountListPage = () => {
  const ref = useRef<ActionType>();

  const handleCreateUser = async (values: any) => {
    return userApi
      .create(values)
      .then((res) => {
        console.log(`res`, res);
      })
      .then(() => {
        ref.current?.reload();
        return true;
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
    // {
    //   title: 'Hành động',
    //   width: 200,
    //   valueType: 'option',
    //   align: 'center',
    //   render: (_, data) => (
    //     <Space>
    //       <Button type="text" danger onClick={() => handleDelete(data.id)}>
    //         Xóa
    //       </Button>
    //       <ModalForm
    //         initialValues={data}
    //         title="Cập nhật tài khoản"
    //         trigger={
    //           <Button type="link" key="create">
    //             Chi tiết
    //           </Button>
    //         }
    //         onFinish={(values) => {
    //           console.log(values);
    //           return new Promise((res) => res(true));
    //         }}
    //       >
    //         <AccountForm updateMode />
    //       </ModalForm>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
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
            onFinish={handleCreateUser}
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
