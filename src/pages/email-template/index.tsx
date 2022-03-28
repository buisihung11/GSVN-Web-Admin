import emailTemplateApi from '@/api/emailTemplate';
import { buildParamsWithPro } from '@/api/utils';
import { EmailClassType } from '@/type/email-template';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Modal, Space } from 'antd';
import { useRef } from 'react';
import { history, Link } from 'umi';

const EmailTemplateListPage = () => {
  const ref = useRef<ActionType>();

  const handleDelete = (accountId: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      onOk: () => {
        return emailTemplateApi.delete(accountId).then(() => {
          if (ref.current?.reload) {
            ref.current.reload();
          }
        });
      },
    });
  };

  const columns: ProColumns[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'subject',
      hideInSearch: true,
      width: 250,
    },
    {
      title: 'Loại',
      dataIndex: 'class',
      width: 250,
      valueType: 'select',
      valueEnum: {
        [EmailClassType.ACCOUNT_CREATED]: {
          text: 'Tạo tài khoản',
        },
        [EmailClassType.ORDER_CREATED]: {
          text: 'Tạo đơn hàng thành công',
        },
      },
    },

    {
      title: 'Kích hoạt',
      dataIndex: 'isActive',
      valueType: 'select',
      width: 250,
      valueEnum: {
        true: {
          text: 'Kích hoạt',
        },
        false: {
          text: 'Chưa kích hoạt',
        },
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: 'Hành động',
      width: 200,
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      render: (_, data) => (
        <Space>
          <Button type="text" danger onClick={() => handleDelete(data.id)}>
            Xóa
          </Button>
          <Divider type="vertical" />
          <Link to={`/admin/email-template/${data.id}`}>Chi tiết</Link>
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
          <Button onClick={() => history.push('/admin/email-template/send')} key="send">
            Gửi email
          </Button>,
          <Button
            onClick={() => history.push('/admin/email-template/create')}
            key="create"
            type="primary"
          >
            Thêm mẫu email
          </Button>,
        ]}
        request={(...params) =>
          emailTemplateApi.get(buildParamsWithPro(...params)).then((res) => ({
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

export default EmailTemplateListPage;
