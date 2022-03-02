import badgeApi from '@/api/badge';
import tutorApi from '@/api/tutor';
import { TutorStatus } from '@/type/constants';
import { TTutor } from '@/type/tutor';
import { getFileNameFormFirebaseUrl } from '@/utils/utils';
import useRequest from '@ahooksjs/use-request';
import { ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Empty,
  List,
  Space,
  Spin,
  Statistic,
  Typography,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { useState } from 'react';
import { IRouteComponentProps } from 'umi';
import provinces from '@/constants/provinces.json';
import districts from '@/constants/districts.json';

const getProvinceText = (code: string) => provinces.find((p) => p.code === code)?.name ?? code;
const getDistrictText = (code: string) => districts.find((d) => d.code === code)?.name ?? code;

const extra = (tutor: TTutor) => {
  const status = tutor.userStatus;
  const isApproved = status === TutorStatus.APPROVED;
  return (
    <Space direction="horizontal" size="large" style={{ width: 250 }}>
      <Statistic
        title="Trạng thái"
        value={isApproved ? 'Đã duyệt' : 'Chưa duyệt'}
        valueStyle={{ color: isApproved ? '#52c41a' : '#fa8c16' }}
      />
      <Statistic title="Danh hiệu" value={tutor.badge?.title ?? 'N/A'} />
    </Space>
  );
};

const description = (tutor: TTutor) => (
  <Space size="large">
    <Space style={{ width: 200 }} direction="vertical" align="center">
      <Avatar
        shape="circle"
        style={{
          width: 104,
          height: 104,
        }}
        src={tutor.avatar?.url}
        alt={tutor.fullName}
      />
      <Typography>
        {tutor.gender} -{' '}
        <Typography.Title level={5} style={{ display: 'inline-block' }}>
          {tutor.fullName}
        </Typography.Title>
      </Typography>
    </Space>
    <Descriptions size="small" column={1}>
      <Descriptions.Item label="Đường link">
        <a target="_blank" href={`https://tutorup.edu.vn/tutor/${tutor.id}/${tutor.slug}`}>
          {tutor.fullName}
        </a>
      </Descriptions.Item>
      <Descriptions.Item label="Giới thiệu">{tutor.about}</Descriptions.Item>
    </Descriptions>
  </Space>
);

const tutorInfoSection = (tutor: TTutor) => (
  <Descriptions title="Thông tin liên lạc" size="small" column={2}>
    <Descriptions.Item label="SDT">{tutor.phone}</Descriptions.Item>
    <Descriptions.Item label="Email">{tutor.email}</Descriptions.Item>
    <Descriptions.Item span={2} label="Địa chỉ">
      {tutor.address}
    </Descriptions.Item>
  </Descriptions>
);

const tutorPaymentInfoSection = (tutor: TTutor) => {
  const bankingAccount = tutor.bankingAccountOwners && tutor.bankingAccountOwners[0];

  return (
    <Descriptions title="Thông tin thanh toán" size="small" column={2}>
      {!bankingAccount ? (
        <Typography>Tutor chưa cập nhật thông tin thanh toán</Typography>
      ) : (
        <>
          <Descriptions.Item label="Ngân hàng">{bankingAccount.bankName}</Descriptions.Item>
          <Descriptions.Item label="Chi nhánh">{bankingAccount.bankBranch}</Descriptions.Item>
          <Descriptions.Item label="Số tài khoản">{bankingAccount.cardNumber}</Descriptions.Item>
          <Descriptions.Item label="Tên chủ tài khoản">
            {bankingAccount.cardHolder}
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
};

const teachingInfoSection = (tutor: TTutor) => (
  <>
    <Descriptions title="Thông tin dạy học" size="small" column={2}>
      <Descriptions.Item label="Phương thức">{tutor.teachForm}</Descriptions.Item>
      <Descriptions.Item label="TP Dạy">{getProvinceText(tutor.teachCity)}</Descriptions.Item>
      <Descriptions.Item label="Quận">{getDistrictText(tutor.teachDistrict)}</Descriptions.Item>
      <Descriptions.Item label="Địa chỉ">{tutor.teachAddress}</Descriptions.Item>
    </Descriptions>
    <ProTable
      headerTitle="Danh sách môn học đăng ký"
      dataSource={tutor.userCoursings}
      search={false}
      pagination={false}
      columns={[
        {
          title: 'Môn học',
          dataIndex: ['coursing', 'title'],
        },
        {
          title: 'Trình độ',
          dataIndex: ['coursingLevel', 'name'],
        },
        {
          title: 'Giá cá nhân',
          dataIndex: 'rate',
          valueType: 'digit',
        },
        {
          title: 'Giá dạy nhóm',
          dataIndex: 'groupRate',
          valueType: 'digit',
        },
      ]}
    />
  </>
);

const certificateSection = (tutor: TTutor) => {
  const introUrl = tutor.introVideo?.url;
  const videoURL = tutor.demoVideo?.url;
  const certificatesLinks = tutor.certificates?.map((c) => c.file.url) ?? [];
  return (
    <>
      <Descriptions layout="vertical" title="Video giới thiệu và bằng cấp" size="middle" column={2}>
        <Descriptions.Item label="Video dạy thử">
          {videoURL ? (
            <video controls style={{ width: '100%', height: '100%' }}>
              <source src={videoURL} type="video/mp4"></source>
            </video>
          ) : (
            'N/A'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Video giới thiệu">
          {introUrl ? (
            <video controls style={{ width: '100%', height: '100%' }}>
              <source src={introUrl} type="video/mp4"></source>
            </video>
          ) : (
            'N/A'
          )}
        </Descriptions.Item>
        <Descriptions.Item label="Bằng cấp" style={{ paddingLeft: '2rem' }}>
          <List
            dataSource={certificatesLinks}
            renderItem={(item) => (
              <List.Item>
                <a href={item} target="_blank">
                  {getFileNameFormFirebaseUrl(item)}
                </a>
              </List.Item>
            )}
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

const TutorDetailPage = ({ match }: IRouteComponentProps<{ tutorId: string }>) => {
  const {
    params: { tutorId },
  } = match;
  const [showApproveModal, setShowApproveModal] = useState<boolean>(false);
  const {
    data: tutor,
    loading,
    refresh,
  } = useRequest(() => tutorApi.getById(+tutorId).then((res) => res.data));

  const handleApproveTutor = async (data: { detail: string }) => {
    if (showApproveModal) {
      await tutorApi.updateTutorStatus(+tutorId, {
        detail: data.detail,
        userStatus: TutorStatus.APPROVED,
      });
    }
    refresh();
    return true;
  };

  const hadleUpdateBadge = async (data: { badge: number }) => {
    const { badge, ...updateData } = tutor || {};
    await tutorApi.updateTutorBadge(+tutorId, {
      ...updateData,
      badgeId: data.badge,
    });
    refresh();
    return true;
  };

  if (loading) {
    return <Spin />;
  }

  if (!tutor) {
    return <Empty description="không tìm thấy giảng viên" />;
  }

  const status = tutor.userStatus;
  const isApproved = status === TutorStatus.APPROVED;

  const action = (
    <>
      <ButtonGroup>
        <ModalForm
          title={`Cập nhật danh hiệu`}
          onFinish={hadleUpdateBadge}
          trigger={<Button>Cập nhật danh hiệu</Button>}
        >
          <ProFormSelect
            name="badge"
            label="Danh hiệu"
            request={() =>
              badgeApi.get({}).then((res) =>
                res.data.map((badge) => ({
                  label: badge.title,
                  value: badge.id,
                })),
              )
            }
            width="md"
          />
        </ModalForm>
        <Button disabled={isApproved} type="primary" onClick={() => setShowApproveModal(true)}>
          Xét duyệt
        </Button>
      </ButtonGroup>
    </>
  );

  return (
    <PageContainer
      extra={action}
      extraContent={extra(tutor)}
      content={description(tutor)}
      title={`ID Giảng viên: ${tutor.id}`}
    >
      <ModalForm
        visible={Boolean(showApproveModal)}
        onVisibleChange={(visible) => !visible && setShowApproveModal(false)}
        title={`Xác nhận xét duyệt cho ${tutor?.fullName}?`}
        onFinish={handleApproveTutor}
      >
        <Alert
          showIcon
          message="Cho phép giảng viên bắt đầu nhận đơn hàng."
          type="info"
          style={{ marginBottom: '1rem' }}
        />
        <ProFormTextArea
          name="detail"
          label="Nội dung"
          placeholder="Giảng viên tiềm năng..."
          width="md"
        />
      </ModalForm>
      <Card bordered={false}>
        {tutorInfoSection(tutor)}
        <Divider style={{ marginBottom: 32 }} />
        {tutorPaymentInfoSection(tutor)}
        <Divider style={{ marginBottom: 32 }} />
        {teachingInfoSection(tutor)}
        <Divider style={{ marginBottom: 32 }} />
        {certificateSection(tutor)}
      </Card>
    </PageContainer>
  );
};

export default TutorDetailPage;
