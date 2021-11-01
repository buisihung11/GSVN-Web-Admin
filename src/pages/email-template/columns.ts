import { EmailClassType } from '@/type/email-template';
import { ProFormColumnsType } from '@ant-design/pro-form';

export const columns: ProFormColumnsType[] = [
  {
    title: 'Nội dung',
    dataIndex: 'content',
    hideInSearch: true,
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
    valueType: 'radio',
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
];
