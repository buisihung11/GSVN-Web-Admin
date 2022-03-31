import orderApi from '@/api/order';
import { buildParamsWithPro } from '@/api/utils';
import { OrderStatus, TOrder } from '@/type/order';
import { districtEnums, formatCurrency, provinceEnums } from '@/utils/utils';
import ProDescriptions from '@ant-design/pro-descriptions';
import {
  DrawerForm,
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Alert, Button, Col, Divider, Row, Space, Tag } from 'antd';
import { useState, useRef } from 'react';
import { PaymentStatus } from '@/type/constants';
import { EditOutlined } from '@ant-design/icons';

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

const ORDER_OPTIONS = [
  {
    label: 'Mới',
    value: OrderStatus.NEW,
  },
  {
    label: 'Admin đã xác nhận',
    value: OrderStatus.ADMIN_CONFIRMED,
  },
  {
    label: 'Tutor đã xác nhận',
    value: OrderStatus.TUTOR_CONFIRMED,
  },
  {
    label: 'Đã thanh toán',
    value: OrderStatus.PAYMENT_CONFIRMED,
  },
  {
    label: 'Đã hủy',
    value: OrderStatus.REJECTED,
  },
  {
    label: 'Đã đóng',
    value: OrderStatus.CLOSED,
  },
];

const OrderListPage = () => {
  const ref = useRef<ActionType>();

  const [currentOrder, setCurrentOrder] = useState<TOrder | null>(null);
  const handleApproveOrder = async (data: { detail: string }) => {
    if (currentOrder) {
      const updateStatus =
        currentOrder.currentStatus === OrderStatus.TUTOR_CONFIRMED
          ? OrderStatus.CLOSED
          : OrderStatus.ADMIN_CONFIRMED;
      await orderApi.updateOrderStatus(currentOrder?.id, {
        detail: data.detail,
        orderStatus: updateStatus,
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
            valueType: 'select',
            valueEnum: {
              '1': {
                text: 'Cá nhân',
              },
              '5': {
                text: 'Nhóm',
              },
            },
          },
          {
            title: 'Ngày bắt đầu',
            dataIndex: 'startDate',
            valueType: 'date',
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
          },
          {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            valueType: 'fromNow',
            span: 2,
          },
          {
            title: 'Địa chỉ học',
            dataIndex: 'teachAddress',
          },
          {
            title: 'Thành phố',
            dataIndex: 'teachCity',
            valueType: 'select',
            valueEnum: provinceEnums as any,
          },
          {
            title: 'Quận huyện',
            dataIndex: 'teachDistrict',
            valueType: 'select',
            valueEnum: districtEnums as any,
          },
          {
            title: 'Tình trạng thanh toán',
            dataIndex: 'paymentStatus',

            span: 3,
            render: (dom, data) => (
              <Space direction="vertical">
                <Tag>{data.paymentStatus}</Tag>
                <ModalForm
                  onFinish={(formData) => {
                    return orderApi.updateOrderPaymentStatus(data.id, formData as any).then(() => {
                      ref.current?.reload();
                      setCurrentOrder(null);
                      return true;
                    });
                  }}
                  trigger={<Button icon={<EditOutlined />}>Cập nhật</Button>}
                  title="Xác nhận đã thanh toán"
                >
                  <ProFormSelect
                    name="paymentStatus"
                    label="Trạng thái"
                    width="md"
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn trạng thái',
                      },
                    ]}
                    options={[
                      {
                        label: 'Đang xử lý',
                        value: PaymentStatus.PENDING,
                      },
                      {
                        label: 'Từ chối',
                        value: PaymentStatus.REJECTED,
                      },
                      {
                        label: 'Thành công',
                        value: PaymentStatus.SUCCESS,
                      },
                      {
                        label: 'Huỷ',
                        value: PaymentStatus.CANCELLED,
                      },
                    ]}
                  />
                  <ProFormText name="reason" label="Ghi chú" />
                </ModalForm>
              </Space>
            ),
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
          {
            title: 'Bill',
            dataIndex: ['bill', 'url'],
            span: 3,
            valueType: 'image',
            // renderText: (value) => <strong>{formatCurrency(value)}</strong>,
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
      search: false,
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
      renderFormItem: () => <ProFormSelect name="orderStatus" options={ORDER_OPTIONS} />,
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
        const canClose = data.currentStatus === OrderStatus.TUTOR_CONFIRMED;
        return (
          <DrawerForm
            submitter={{
              searchConfig: {
                submitText: isNeedApprove
                  ? 'Xét duyệt'
                  : canClose
                  ? 'Đánh dấu đã hoàn thành'
                  : 'Đóng',
                resetText: 'Quay lại',
              },

              submitButtonProps: {
                disabled: data.paymentStatus !== PaymentStatus.SUCCESS,
              },
            }}
            onFinish={() => {
              if (isNeedApprove || canClose) {
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
        title={`Xác nhận ${
          currentOrder?.currentStatus !== OrderStatus.TUTOR_CONFIRMED ? 'xét duyệt' : 'hoàn thành'
        } cho đơn hàng #${currentOrder?.id}?`}
        onFinish={handleApproveOrder}
        width={400}
      >
        <Alert
          showIcon
          message={`Xác nhận giảng viên có thể ${
            currentOrder?.currentStatus !== OrderStatus.TUTOR_CONFIRMED ? 'nhận' : 'hoàn thành'
          } đơn hàng này.`}
          type="info"
        />
        <ProFormTextArea name="detail" label="Nội dung" width="md" />
      </ModalForm>
      <ProTable<TOrder>
        actionRef={ref}
        search={{
          layout: 'vertical',
        }}
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
