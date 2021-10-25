import courseApi from '@/api/course';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { TCourse } from '@/type/course';
import useRequest from '@ahooksjs/use-request';
import { BetaSchemaForm, ProFormColumnsType, ProFormUploadDragger } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Empty, Spin } from 'antd';
import { IRouteComponentProps } from 'umi';

interface Props {}

const UpdateCoursePage = ({ match, location }: IRouteComponentProps<{ courseId: string }>) => {
  const {
    params: { courseId },
  } = match;
  console.log(`location`, location);
  const course: TCourse = location.state as any;
  // const { data: course, loading } = useRequest(
  //   () => courseApi.getById(+courseId).then((res) => res.data),
  //   {
  //     initialData: initCourse,
  //     onSuccess: (res) => {
  //       const transformedRes = { ...res };
  //       if (transformedRes.tableOfContent) {
  //         transformedRes.tableOfContent = JSON.parse(transformedRes.tableOfContent);
  //       }
  //     },
  //     ready: Boolean(courseId),
  //   },
  // );

  const columns: ProFormColumnsType[] = [
    {
      title: 'Banner',
      dataIndex: 'bannerUrl',
      width: 'md',
      renderFormItem: (props) => (
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
      title: 'Miêu tả',
      dataIndex: 'content',
      renderFormItem: () => <ResoEditor />,
    },
  ];

  const handleUpdateCourse = async (values: TCourse) => {
    const transformValues = { ...values, tableOfContent: JSON.stringify(values.tableOfContent) };
    await courseApi.update(course?.id, transformValues);
    return true;
  };

  // if (loading) {
  //   return <Spin />;
  // }

  if (!course) {
    return <Empty description="không tìm thấy Khóa học" />;
  }

  return (
    <PageContainer>
      <Card>
        <BetaSchemaForm
          initialValues={course}
          submitter={{
            searchConfig: {
              submitText: 'Cập nhật',
            },
          }}
          onFinish={handleUpdateCourse}
          columns={columns}
        />
      </Card>
    </PageContainer>
  );
};

export default UpdateCoursePage;
