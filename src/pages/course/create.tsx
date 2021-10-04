import courseApi from '@/api/course';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { TCourse } from '@/type/course';
import { BetaSchemaForm, ProFormColumnsType, ProFormUploadDragger } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

interface Props {}

const CreateCoursePage = (props: Props) => {
  const columns: ProFormColumnsType[] = [
    {
      title: 'Banner',
      dataIndex: 'bannerUrl',
      width: 'md',
      renderFormItem: (props, config) => (
        <ProFormUploadDragger
          title="Hình ảnh"
          description="Kéo thả hình ảnh vào đây"
          width="md"
          name={props.dataIndex}
        />
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
          render: (dom) => <div style={{ alignItems: 'start' }}>{dom}</div>,
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
                day: {
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
      title: 'Miêu tả',
      dataIndex: 'content',
      width: 'md',
      valueType: 'textarea',
    },

    {
      title: 'Nội dung',
      dataIndex: 'tableOfContent',
      renderFormItem: () => <ResoEditor />,
    },
  ];

  const handleCreateCourse = async (values: TCourse) => {
    await courseApi.create(values);
    return true;
  };

  return (
    <PageContainer>
      <Card>
        <BetaSchemaForm
          submitter={{
            searchConfig: {
              submitText: 'Tạo',
            },
          }}
          onFinish={handleCreateCourse}
          columns={columns}
        />
      </Card>
    </PageContainer>
  );
};

export default CreateCoursePage;
