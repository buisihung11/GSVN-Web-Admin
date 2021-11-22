import { EmailClassType } from '@/type/email-template';
import { ProFormColumnsType } from '@ant-design/pro-form';

export const columns: ProFormColumnsType[] = [
  {
    valueType: 'group',
    columns: [
      {
        title: 'Tiêu đề',
        dataIndex: 'subject',
        hideInSearch: true,
        width: 'md',
      },
      {
        title: 'Kích hoạt',
        dataIndex: 'isActive',
        valueType: 'switch',
        width: 'md',
        valueEnum: {
          true: {
            text: 'Kích hoạt',
          },
          false: {
            text: 'Chưa kích hoạt',
          },
        },
      },
    ],
  },

  {
    title: 'Loại',
    dataIndex: 'class',
    width: 'md',
    valueType: 'select',
    valueEnum: {
      [EmailClassType.ACCOUNT_CREATED]: {
        text: 'Tạo tài khoản',
      },
      [EmailClassType.ORDER_CREATED]: {
        text: 'Tạo đơn hàng thành công',
      },
      [EmailClassType.OTHER]: {
        text: 'Khác',
      },
    },
  },
];
