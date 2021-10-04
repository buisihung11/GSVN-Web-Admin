import { default as coursing, default as coursingApi } from '@/api/coursing';
import { buildParamsWithPro } from '@/api/utils';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Button, Modal, Space } from 'antd';
import CoursingForm from './components/CoursingForm';

const CoursingListPage = () => {
  const handleDelete = (accountId: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      onOk: () => {
        return coursingApi.delete(accountId);
      },
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
            onFinish={async (values) => {
              await coursing.create(values);
              return true;
            }}
          >
            <CoursingForm />
          </ModalForm>,
        ]}
        request={(...params) =>
          coursing.get(buildParamsWithPro(...params)).then((res) => ({
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

export default CoursingListPage;
