import { useState } from 'react';
import tutorApi from '@/api/tutor';
import { TutorStatus } from '@/type/constants';
import { TTutor } from '@/type/tutor';
import useRequest from '@ahooksjs/use-request';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
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
import { IRouteComponentProps } from 'umi';

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
        <a target="_blank" href={`https://gsvn-deploy.vercel.app/tutor/${tutor.id}/${tutor.slug}`}>
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

const teachingInfoSection = (tutor: TTutor) => (
  <>
    <Descriptions title="Thông tin dạy học" size="small" column={2}>
      <Descriptions.Item label="Phương thức">{tutor.teachForm}</Descriptions.Item>
      <Descriptions.Item label="TP Dạy">{tutor.teachCity}</Descriptions.Item>
      <Descriptions.Item label="Quận">{tutor.teachDistrict}</Descriptions.Item>
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
          dataIndex: 'coursingLevel',
        },
      ]}
    />
  </>
);

const certificateSection = (tutor: TTutor) => {
  const videoURL = tutor.demoVideo?.url;
  const certificatesLinks = tutor.certificates?.map((c) => c.file.url) ?? [];
  return (
    <>
      <Descriptions layout="vertical" title="Video giới thiệu và bằng cấp" size="middle" column={2}>
        <Descriptions.Item label="Video giới thiệu">
          {videoURL ? (
            <video controls style={{ width: '100%', height: '100%' }}>
              <source src={videoURL} type="video/mp4"></source>
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
                <a href="#">{item}</a>
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
  const { data: tutor, loading } = useRequest(() =>
    tutorApi.getById(+tutorId).then((res) => res.data),
  );
  const handleApproveTutor = async (data: { detail: string }) => {
    if (showApproveModal) {
      await tutorApi.updateTutorStatus(+tutorId, {
        detail: data.detail,
        status: TutorStatus.APPROVED,
      });
    }
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
        <Button>Cập nhật danh hiệu</Button>
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
        {teachingInfoSection(tutor)}
        <Divider style={{ marginBottom: 32 }} />
        {certificateSection(tutor)}
      </Card>
    </PageContainer>
  );
};

export default TutorDetailPage;
