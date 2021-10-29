import courseApi from '@/api/course';
import { buildParamsWithPro } from '@/api/utils';
import { TCourse } from '@/type/course';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Avatar, Button, Divider, Modal, Space, Typography } from 'antd';
import { useRef } from 'react';
import { Link, history } from 'umi';

const CourseListPage = () => {
  const ref = useRef<ActionType>();

  const handleDelete = (courseId: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      onOk: () => {
        return courseApi.delete(courseId).then(() => {
          if (ref.current?.reload) {
            ref.current.reload();
          }
        });
      },
    });
  };

  const columns: ProColumns[] = [
    {
      title: 'Banner',
      dataIndex: ['banner', 'url'],
      width: 250,
      render: (value) => (
        <Avatar shape="square" src={value} style={{ width: '80%', height: 'auto' }} />
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      width: 200,
    },
    {
      title: 'Giáo viên phụ trách',
      dataIndex: 'inCharge',
      width: 300,
    },
    {
      title: 'Miêu tả',
      dataIndex: 'content',
      hideInSearch: true,
      width: 300,
      render: (value) => (
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
          }}
        >
          {value}
        </Typography.Paragraph>
      ),
    },
    {
      title: 'Độ dài khóa học',
      dataIndex: 'duration',
      valueType: 'digit',
      width: 300,
      render: (duration, { durationUnit }) => (
        <span>
          {duration} {durationUnit}
        </span>
      ),
    },
    {
      title: 'Giá tiền',
      dataIndex: 'amount',
    },
    {
      title: 'Giảm giá',
      dataIndex: 'discount',
      valueType: 'percent',
      hideInSearch: true,
    },
    {
      title: 'Hình thức dạy',
      dataIndex: 'teachForm',
      hideInSearch: true,
    },
    {
      title: 'Hành động',
      valueType: 'option',
      align: 'center',
      render: (_, data) => (
        <Space direction="horizontal">
          <Link
            to={{
              pathname: `/admin/course/${data.id}`,
            }}
          >
            Cập nhật
          </Link>
          <Divider type="vertical" />
          <Button onClick={() => handleDelete(data.id)} danger type="link">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<TCourse>
        actionRef={ref}
        scroll={{
          x: 900,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => history.push('/admin/course/create')}
            icon={<PlusOutlined />}
          >
            Thêm khóa học
          </Button>,
        ]}
        request={(...params) =>
          courseApi.get(buildParamsWithPro(...params)).then((res) => ({
            data: res.data.items,
            total: res.data.items.length,
          }))
        }
        columns={columns}
      />
    </PageContainer>
  );
};

export default CourseListPage;
