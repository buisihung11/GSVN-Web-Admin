import { ProFormColumnsType } from '@ant-design/pro-form';

export const columns: ProFormColumnsType[] = [
  {
    title: 'Version',
    dataIndex: 'version',
    valueType: 'digit',
    width: 'md',
  },
  {
    valueType: 'group',
    title: 'Thông tin Momo',
    columns: [
      {
        title: 'Access key',
        dataIndex: ['providers', 'momoConfiguration', 'accessKey'],
        width: 'md',
      },
      {
        title: 'Partner code',
        dataIndex: ['providers', 'momoConfiguration', 'partnerCode'],
        width: 'md',
      },
      {
        title: 'Secret',
        dataIndex: ['providers', 'momoConfiguration', 'secret'],
        width: 'md',
      },
    ],
  },
  {
    valueType: 'group',
    title: 'Thông tin liên hệ',
    columns: [
      {
        title: 'Địa chỉ',
        dataIndex: ['contactInfo', 'address'],
        width: 'md',
      },
      {
        title: 'Liện hệ',
        dataIndex: ['contactInfo', 'phone'],
        width: 'md',
      },
    ],
  },
  {
    valueType: 'group',
    title: 'Thông tin thanh toán',
    columns: [
      {
        title: 'Tên ngân hàng',
        dataIndex: ['bankingInfo', 'bankName'],
        width: 'md',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },
      {
        title: 'Chi nhánh',
        dataIndex: ['bankingInfo', 'bankBranch'],
        width: 'md',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },
      {
        title: 'Số tài khoản',
        dataIndex: ['bankingInfo', 'cardNumber'],
        width: 'md',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },
      {
        title: 'Tên chủ tài khoản',
        dataIndex: ['bankingInfo', 'cardHolder'],
        width: 'md',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
      },
    ],
  },
];
