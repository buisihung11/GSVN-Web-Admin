import { useRef } from 'react';
import badgeApi from '@/api/badge';
import { buildParamsWithPro } from '@/api/utils';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Avatar, Button, Modal, Space } from 'antd';
import BadgeForm from './components/BadgeForm';

const BadgeListPage = () => {
  const ref = useRef<ActionType>();

  const handleDelete = (accountId: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      onOk: () => {
        return badgeApi.delete(accountId).then(() => {
          if (ref.current?.reload) {
            ref.current.reload();
          }
        });
      },
    });
  };

  const columns: ProColumns[] = [
    {
      title: 'Banner',
      dataIndex: ['image', 'url'],
      width: 250,
      render: (value) => (
        <Avatar shape="square" src={value} style={{ width: '100px', height: 'auto' }} />
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
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
            initialValues={{ ...data, imageUrl: data.image?.url }}
            title="Cập nhật danh hiệu"
            trigger={
              <Button type="link" key="create">
                Chi tiết
              </Button>
            }
            onFinish={(values) => {
              return badgeApi
                .update(data.id, { ...data, ...values } as any)
                .then(() => true)
                .then(() => {
                  if (ref.current?.reload) {
                    ref.current.reload();
                  }
                  return true;
                });
            }}
          >
            <BadgeForm />
          </ModalForm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        search={false}
        toolBarRender={() => [
          <ModalForm
            title="Tạo mới danh hiệu"
            trigger={
              <Button key="create" type="primary">
                Thêm danh hiệu
              </Button>
            }
            onFinish={(values) => {
              return badgeApi
                .create(values)
                .then(() => {
                  if (ref.current?.reload) {
                    ref.current.reload();
                  }
                })
                .then(() => true);
            }}
          >
            <BadgeForm />
          </ModalForm>,
        ]}
        request={(...params) =>
          badgeApi.get(buildParamsWithPro(...params)).then((res) => ({
            data: res.data,
            total: res.data.length,
          }))
        }
        columns={columns}
        pagination={false}
      />
    </PageContainer>
  );
};

export default BadgeListPage;
