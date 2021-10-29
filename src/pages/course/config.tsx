import ResoEditor from '@/components/ResoEditor/ResoEditor';
import UploadFile from '@/components/Upload/UploadFile';
import { TCourse } from '@/type/course';
import ProForm, { ProFormColumnsType } from '@ant-design/pro-form';

export const transformData = (values: TCourse) => {
  return {
    ...values,
    tableOfContent: JSON.stringify(values.tableOfContent),
    benefit: JSON.stringify(values.benefit),
  };
};

export const normalizeData = (res: TCourse) => {
  const transformedRes: TCourse = { ...res };
  try {
    if (transformedRes.tableOfContent) {
      transformedRes.tableOfContent = JSON.parse(transformedRes.tableOfContent);
    }
    if (transformedRes.benefit) {
      transformedRes.benefit = JSON.parse(transformedRes.benefit);
    }
  } catch (error) {
    console.log(`error`, error);
  }
  return transformedRes;
};

export const columns: ProFormColumnsType[] = [
  {
    title: 'Banner',
    dataIndex: ['banner', 'url'],
    width: 'md',
    renderFormItem: () => (
      <ProForm.Item name={['banner', 'url']}>
        <UploadFile accept="image/*" style={{ height: '100%' }} />
      </ProForm.Item>
    ),
  },
  {
    valueType: 'group',
    columns: [
      {
        title: 'Tiêu đề',
        dataIndex: 'title',
        width: 'md',
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên khóa học',
            },
          ],
        },
      },
      {
        title: 'Hình thức dạy',
        dataIndex: 'teachForm',
        valueType: 'select',
        width: 'md',
        initialValue: 'both',
        valueEnum: {
          online: {
            text: 'Online',
          },
          offline: {
            text: 'Offline',
          },
          both: {
            text: 'Tất cả',
          },
        },
      },
    ],
  },

  {
    valueType: 'group',

    columns: [
      {
        valueType: 'group',
        width: 'md',
        columns: [
          {
            title: 'Giá tiền',
            dataIndex: 'amount',
            valueType: 'money',
            width: 'sm',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: 'Vui lòng nhập giá tiền',
                },
              ],
            },
          },
          {
            title: 'Giảm giá',
            dataIndex: 'discount',
            valueType: 'digit',
            width: 'xs',
            fieldProps: {
              addonAfter: '%',
              max: 100,
            },
          },
        ],
      },
      {
        valueType: 'group',
        width: 'md',
        render: (dom: any) => <div style={{ alignItems: 'start' }}>{dom}</div>,
        columns: [
          {
            title: 'Độ dài khóa học',
            dataIndex: 'duration',
            valueType: 'digit',
            width: 'sm',
          },
          {
            title: 'Đơn vị',
            dataIndex: 'durationUnit',
            valueType: 'radio',
            width: 'xs',
            valueEnum: {
              weeks: {
                text: 'Tuần',
              },
              days: {
                text: 'Ngày',
              },
            },
          },
        ],
      },
    ],
  },
  {
    title: 'Tên giáo viên phụ trách',
    dataIndex: 'inCharge',
    width: 'md',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'Vui lòng nhập tên giáo viên phụ trách',
        },
      ],
    },
  },
  {
    title: 'Nội dung',
    valueType: 'formList',
    dataIndex: 'tableOfContent',
    fieldProps: {
      creatorButtonProps: {
        position: 'bottom',
        creatorButtonText: 'Thêm',
      },
    },
    columns: [
      {
        valueType: 'group',
        columns: [
          {
            title: 'Tiêu đề',
            dataIndex: 'title',
            valueType: 'text',
            width: 'xs',
          },
          {
            title: 'Nội dung',
            dataIndex: 'description',
            valueType: 'textarea',
            width: 'm',
          },
        ],
      },
    ],
  },
  {
    title: 'Quyền lợi',
    valueType: 'formList',
    dataIndex: 'benefit',
    fieldProps: {
      creatorButtonProps: {
        position: 'bottom',
        creatorButtonText: 'Thêm',
      },
    },
    columns: [
      {
        valueType: 'group',
        columns: [
          {
            title: 'Tiêu đề',
            dataIndex: 'title',
            valueType: 'text',
            width: 'xs',
          },
        ],
      },
    ],
  },
  {
    title: 'Miêu tả',
    dataIndex: 'content',
    renderFormItem: () => <ResoEditor />,
  },
];
