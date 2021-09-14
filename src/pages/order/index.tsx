import { useState } from 'react';
import { OrderStatus, TOrder } from '@/type/order';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { DrawerForm, ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Alert, Button, Divider, Modal } from 'antd';
import faker from 'faker';
import orderApi from '@/api/order';

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

const mockData = [...new Array(20)].map<TOrder>((_, idx) => ({
  id: idx + 1,
  createdAt: faker.date.past(),
  tutor: {
    id: faker.datatype.number(),
    avatar: {
      url: 'https://d21xzygesx9h0w.cloudfront.net/TUTOROO-Russian-Tutor-Singapore-Lana-1040.jpg',
    },
    fullName: faker.name.findName(),
    rate: +faker.finance.amount(150, 250),
    totalHourRemain: faker.datatype.number(20),
    totalReview: faker.datatype.number(30),
    teachForm: 'both',
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    badge: {
      id: faker.datatype.number(),
      title: 'Diamond',
    },
  },
  status: faker.random.arrayElement(Object.values(OrderStatus)),
  owner: {
    fullName: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
  },
  class: 'tutorOrder',
  coursingTitle: faker.lorem.words(),
  coursingLevel: '',
  orderRate: 0,
  totalStudent: 0,
  startDate: faker.date.soon(3),
  hoursPerWeek: 0,
  teachForm: 'both',
  teachAddress: '',
  teachDistrict: '',
  teachCity: '',
}));

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
      >
        <Alert showIcon message="Xác nhận giảng viên có thể nhận đơn hàng này." type="info" />
        <ProFormTextArea name="detail" label="Nội dung" width="md" />
      </ModalForm>
      <ProTable<TOrder>
        columns={columns}
        dataSource={mockData}
        // request={(params) =>
        //   orderApi.get(params).then((res) => ({
        //     total: res.data.totalItems,
        //     success: true,
        //     data: res.data.items,
        //   }))
        // }
      />
    </PageContainer>
  );
};

export default OrderListPage;
