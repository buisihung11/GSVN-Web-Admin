import tutorApi from '@/api/tutor';
import { buildParamsWithPro } from '@/api/utils';
import { TutorStatus } from '@/type/constants';
import type { TTutor } from '@/type/tutor';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Alert, Button, Divider, Space } from 'antd';
import { useRef, useState } from 'react';
import { Link } from 'umi';

const TutorListPage = () => {
  const [currentTutor, setCurrentTutor] = useState<TTutor | null>(null);
  const ref = useRef<ActionType>();

  const handleApproveTutor = async (data: { detail: string }) => {
    if (currentTutor) {
      await tutorApi.updateTutorStatus(currentTutor?.id, {
        detail: data.detail,
        userStatus: TutorStatus.APPROVED,
      });
      ref.current?.reload();
    }
    return true;
  };

  const goodsColumns: ProColumns[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      search: false,
    },
    {
      title: 'Tên giảng viên',
      dataIndex: 'fullName',
      key: 'name',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: 120,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      width: 120,
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      sorter: true,
      width: 120,
      valueType: 'select',
      valueEnum: {
        male: {
          text: 'Nam',
        },
        female: {
          text: 'Nữ',
        },
        preferNo: {
          text: 'Khác',
        },
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      hideInSearch: true,
      width: 120,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      hideInSearch: true,
      ellipsis: true,
      width: 150,
      search: false,
    },
    {
      title: 'Mã giới thiệu',
      dataIndex: 'referalCode',
      hideInSearch: true,
      copyable: true,
      width: 150,
      search: false,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'userStatus',
      width: 120,
      valueType: 'select',
      valueEnum: {
        [TutorStatus.NEW]: {
          text: 'Mới',
          status: 'warning',
        },
        [TutorStatus.APPROVED]: {
          text: 'Đã duyệt',
          status: 'success',
        },
      },
    },
    {
      title: 'Hành động',
      width: 200,
      valueType: 'option',
      fixed: 'right',
      align: 'center',
      render: (_, data) => (
        <Space direction="horizontal">
          <Button
            disabled={data.userStatus === TutorStatus.APPROVED}
            type="link"
            onClick={() => setCurrentTutor(data)}
          >
            Xét duyệt
          </Button>
          <Divider type="vertical" />
          <Link to={`/admin/tutor/${data.id}`}>Chi tiết</Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ModalForm
        visible={Boolean(currentTutor)}
        onVisibleChange={(visible) => !visible && setCurrentTutor(null)}
        title={`Xác nhận xét duyệt cho ${currentTutor?.fullName}?`}
        onFinish={handleApproveTutor}
      >
        <Alert showIcon message="Cho phép giảng viên bắt đầu nhận đơn hàng." type="info" />
        <ProFormTextArea
          name="detail"
          label="Nội dung"
          placeholder="Giảng viên tiềm năng..."
          width="md"
        />
      </ModalForm>
      <ProTable
        actionRef={ref}
        scroll={{
          x: 650,
        }}
        search={{
          layout: 'vertical',
        }}
        request={(...params) =>
          tutorApi.get({ ...buildParamsWithPro(...params), roleType: 'tutor' }).then((res) => ({
            data: res.data.items,
            total: res.data.items.length,
          }))
        }
        columns={goodsColumns}
      />
    </PageContainer>
  );
};

export default TutorListPage;
