import { useRef } from 'react';
import coursingApi from '@/api/coursing';
import { buildParamsWithPro } from '@/api/utils';
import { ModalForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Modal, Space, Tag } from 'antd';
import CoursingForm from './components/CoursingForm';
import { TCoursing } from '@/type/coursing';

const CoursingListPage = () => {
  const ref = useRef<ActionType>();

  const handleDelete = (accountId: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      onOk: () => {
        return coursingApi.delete(accountId).then(() => ref.current?.reload());
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
      dataIndex: 'title',
    },
    {
      title: 'Cấp bậc',
      dataIndex: 'coursingLevels',
      render: (_, { coursingLevels = [] }: TCoursing) => (
        <Space>
          {coursingLevels.map(({ name }) => (
            <Tag>{name}</Tag>
          ))}
        </Space>
      ),
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
              return coursingApi
                .update(data.id, values as TCoursing)
                .then(() => ref.current?.reload());
            }}
          >
            <CoursingForm updateMode />
          </ModalForm>
        </Space>
      ),
    },
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
            title="Tạo mới môn học"
            trigger={
              <Button key="create" type="primary">
                Thêm môn học
              </Button>
            }
            onFinish={async (values) => {
              await coursingApi.create(values);
              ref.current?.reload();
              return true;
            }}
          >
            <CoursingForm />
          </ModalForm>,
        ]}
        request={(...params) =>
          coursingApi.get(buildParamsWithPro(...params)).then((res) => ({
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
