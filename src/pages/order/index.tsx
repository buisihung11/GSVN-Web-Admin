import orderApi from '@/api/order';
import { buildParamsWithPro } from '@/api/utils';
import { OrderStatus, TOrder } from '@/type/order';
import { formatCurrency } from '@/utils/utils';
import ProDescriptions from '@ant-design/pro-descriptions';
import { DrawerForm, ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Alert, Button, Col, Divider, Row } from 'antd';
import { useState, useRef } from 'react';

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
  const ref = useRef<ActionType>();

  const [currentOrder, setCurrentOrder] = useState<TOrder | null>(null);
  const handleApproveOrder = async (data: { detail: string }) => {
    if (currentOrder) {
      await orderApi.updateOrderStatus(currentOrder?.id, {
        detail: data.detail,
        orderStatus: OrderStatus.ADMIN_CONFIRMED,
      });
    }
    ref.current?.reload();
    return true;
  };

  const drawerContent = (order: TOrder) => (
    <>
      <ProDescriptions
        title={`Chi tiết đơn hàng #${order.id}`}
        dataSource={order}
        column={3}
        columns={[
          {
            title: 'Môn học',
            dataIndex: 'coursingTitle',
          },
          {
            title: 'Cấp bậc',
            dataIndex: 'coursingLevel',
          },
          {
            title: 'Số giờ học / tuần',
            dataIndex: 'hoursPerWeek',
            valueType: 'digit',
          },
          {
            title: 'Số học sinh',
            dataIndex: 'totalStudent',
            valueType: 'digit',
          },
          {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            valueType: 'fromNow',
          },
          {
            title: 'Trạng thái',
            dataIndex: 'currentStatus',
            valueType: 'select',
            valueEnum: orderEnum,
          },
          {
            title: 'Hình thức dạy',
            dataIndex: 'teachForm',
            valueType: 'select',
            valueEnum,
            span: 3,
          },
          {
            title: 'Địa chỉ học',
            dataIndex: 'teachAddress',
          },
          {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            valueType: 'fromNow',
            span: 3,
          },
          {
            title: 'Tạm tính',
            dataIndex: 'totalAmount',
            renderText: (value) => <strong>{formatCurrency(value)}</strong>,
            span: 3,
          },
          {
            title: 'Tổng',
            dataIndex: 'finalAmount',
            span: 3,
            renderText: (value) => <strong>{formatCurrency(value)}</strong>,
          },
        ]}
      />
      <Divider />
      <Row>
        <Col span={12}>
          <ProDescriptions
            title="Thông tin giảng viên"
            dataSource={order.tutor}
            column={1}
            columns={[
              {
                title: 'Tên giảng viên',
                dataIndex: 'fullName',
              },
              {
                title: 'Địa chỉ',
                dataIndex: 'teachAddress',
              },
            ]}
          />
        </Col>
        <Col span={12}>
          <ProDescriptions
            title="Thông tin học sinh"
            column={1}
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
        </Col>
      </Row>
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
      sorter: true,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Giảng viên',
      dataIndex: ['tutor', 'fullName'],
      hideInSearch: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'currentStatus',
      valueType: 'select',
      sorter: true,
      valueEnum: orderEnum,
    },
    {
      title: 'Môn học',
      dataIndex: 'coursingTitle',
      hideInSearch: true,
    },
    {
      title: 'Cấp bậc',
      dataIndex: 'coursingLevel',
      hideInSearch: true,
    },
    {
      title: 'Số giờ học / tuần',
      dataIndex: 'hoursPerWeek',
      valueType: 'digit',
      hideInSearch: true,
      sorter: true,
    },
    {
      title: 'Hành động',
      width: 150,
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      render: (_, data) => {
        const isNeedApprove = data.currentStatus === OrderStatus.NEW;
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
        actionRef={ref}
        columns={columns}
        // dataSource={mockData}
        request={(...params) => {
          console.log(`params`, params);
          return orderApi.get(buildParamsWithPro(...params)).then((res) => ({
            total: res.data.totalItems,
            success: true,
            data: res.data.items,
          }));
        }}
      />
    </PageContainer>
  );
};

export default OrderListPage;
