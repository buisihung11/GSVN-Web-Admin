import orderApi from '@/api/order';
import { buildParamsWithPro } from '@/api/utils';
import { OrderStatus, TOrder } from '@/type/order';
import ProDescriptions from '@ant-design/pro-descriptions';
import { DrawerForm, ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Alert, Button, Divider } from 'antd';
import { useState } from 'react';

const valueEnum = {
  null: { text: 'Tất cả', status: 'Default' },
  preferNo: { text: 'Khác', status: 'Default' },
  online: { text: 'Online', status: 'Processing' },
  offline: { text: 'Offline', status: 'Default' },
};

const orderEnum = {
  null: { text: 'Tất cả', status: 'default' },
  [OrderStatus.NEW]: { text: 'Mới', status: 'warning' },
  [OrderStatus.ADMIN_CONFIRMED]: { text: 'Admin đã xác nhận', status: 'processing' },
  [OrderStatus.TUTOR_CONFIRMED]: { text: 'Tutor đã xác nhận', status: 'processing' },
  [OrderStatus.PAYMENT_CONFIRMED]: { text: 'Đã thanh toán', status: 'success' },
  [OrderStatus.REJECTED]: { text: 'Đã hủy', status: 'error' },
  [OrderStatus.CLOSED]: { text: 'Đã đóng', status: 'error' },
};

const OrderListPage = () => {
  const [currentOrder, setCurrentOrder] = useState<TOrder | null>(null);
  const handleApproveOrder = async (data: { detail: string }) => {
    if (currentOrder) {
      await orderApi.updateOrderStatus(currentOrder?.id, {
        detail: data.detail,
        status: OrderStatus.ADMIN_CONFIRMED,
      });
    }
    return true;
  };

  const drawerContent = (order: TOrder) => (
    <>
      <ProDescriptions
        title={`Chi tiết đơn hàng #${order.id}`}
        dataSource={order}
        columns={[
          {
            title: 'Môn học',
            dataIndex: 'coursingTitle',
          },
          {
            title: 'Trạng thái',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: orderEnum,
          },
          {
            title: 'Hình thức dạy',
            dataIndex: 'teachForm',
            valueType: 'select',
            valueEnum,
          },
          {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            valueType: 'fromNow',
          },
          {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            valueType: 'fromNow',
          },
        ]}
      />
      <Divider />
      <ProDescriptions
        title="Thông tin giảng viên"
        dataSource={order.tutor}
        columns={[
          {
            title: 'Tên giảng viên',
            dataIndex: 'fullName',
          },
          {
            title: 'Email',
            dataIndex: 'email',
          },
          {
            title: 'Số điện thoại',
            dataIndex: 'phone',
          },
        ]}
      />
      <Divider />
      <ProDescriptions
        title="Thông tin học sinh"
        dataSource={order.owner}
        columns={[
          {
            title: 'Tên học sinh',
            dataIndex: 'fullName',
          },
          {
            title: 'Email',
            dataIndex: 'email',
          },
          {
            title: 'Số điện thoại',
            dataIndex: 'phone',
          },
        ]}
      />
    </>
  );

  const columns: ProColumns<TOrder>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      hideInSearch: true,
    },
    {
      title: 'Tạo bởi',
      dataIndex: 'createdByUserId',
      key: 'createdByUserId',
      hideInSearch: true,
      hideInTable: true,
    },

    {
      title: 'Hình thức dạy',
      dataIndex: 'teachForm',
      valueType: 'select',
      valueEnum,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      valueType: 'fromNow',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'tutor.fullName',
      hideInSearch: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      valueType: 'select',
      sorter: true,
      valueEnum: orderEnum,
    },
    {
      title: 'Hành động',
      width: 150,
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      render: (_, data) => {
        const isNeedApprove = data.status === OrderStatus.NEW;
        return (
          <DrawerForm
            submitter={{
              searchConfig: {
                submitText: isNeedApprove ? 'Xét duyệt' : 'Đóng',
                resetText: 'Quay lại',
              },
            }}
            onFinish={() => {
              if (isNeedApprove) {
                setCurrentOrder(data);
              }
              return new Promise((res) => res(true));
            }}
            trigger={<Button type="link">Chi tiết</Button>}
          >
            {drawerContent(data)}
          </DrawerForm>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <ModalForm
        visible={Boolean(currentOrder)}
        onVisibleChange={(visible) => !visible && setCurrentOrder(null)}
        title={`Xác nhận xét duyệt cho đơn hàng #${currentOrder?.id}?`}
        onFinish={handleApproveOrder}
        width={400}
      >
        <Alert showIcon message="Xác nhận giảng viên có thể nhận đơn hàng này." type="info" />
        <ProFormTextArea name="detail" label="Nội dung" width="md" />
      </ModalForm>
      <ProTable<TOrder>
        columns={columns}
        // dataSource={mockData}
        request={(...params) =>
          orderApi.get(buildParamsWithPro(...params)).then((res) => ({
            total: res.data.totalItems,
            success: true,
            data: res.data.items,
          }))
        }
      />
    </PageContainer>
  );
};

export default OrderListPage;
