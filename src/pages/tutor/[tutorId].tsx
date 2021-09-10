import { TTutor } from '@/type/tutor';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Divider,
  Space,
  Statistic,
  Typography,
  List,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import faker from 'faker';

const extra = (tutor: TTutor) => (
  <Space direction="horizontal" size="large" style={{ width: 250 }}>
    <Statistic title="Trạng thái" value="Chưa duyệt" />
    <Statistic title="Danh hiệu" value={tutor.badge?.title} />
  </Space>
);

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
      dataSource={tutor.coursings}
      search={false}
      pagination={false}
      columns={[
        {
          title: 'Môn học',
          dataIndex: 'title',
        },
        {
          title: 'Lớp học',
          dataIndex: 'coursingLevel',
        },
      ]}
    />
  </>
);

const certificateSection = (tutor: TTutor) => (
  <>
    <Descriptions layout="vertical" title="Video giới thiệu và bằng cấp" size="middle" column={2}>
      <Descriptions.Item label="Video giới thiệu">
        <video controls style={{ width: '100%', height: '100%' }}>
          <source
            src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
            type="video/mp4"
          ></source>
        </video>
      </Descriptions.Item>
      <Descriptions.Item label="Bằng cấp" style={{ paddingLeft: '2rem' }}>
        <List
          dataSource={['Bang-cap1.pdf', 'Bang-cap1.pdf', 'Bang-cap1.pdf']}
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

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      return (
        <>
          <ButtonGroup>
            <Button>Cập nhật danh hiệu</Button>
            <Button type="primary">Xét duyệt</Button>
          </ButtonGroup>
        </>
      );
    }}
  </RouteContext.Consumer>
);

const TutorDetailPage = () => {
  const tutor: TTutor = {
    id: faker.datatype.number(),
    avatar: {
      url: 'https://d21xzygesx9h0w.cloudfront.net/TUTOROO-Russian-Tutor-Singapore-Lana-1040.jpg',
    },
    fullName: faker.name.findName(),
    rate: +faker.finance.amount(0, 5),
    totalHourRemain: faker.datatype.number(20),
    totalReview: faker.datatype.number(30),
    teachForm: 'both',
    badge: {
      id: faker.datatype.number(),
      title: 'Diamond',
    },
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    groupRate: 200,
    about: faker.lorem.paragraph(2),
    gender: 'female',
    address: faker.address.cityName(),
    hoursPerWeek: 0,
    teachAddress: '',
    teachDistrict: '',
    teachCity: '',
    slug: faker.lorem.slug(4),
    coursings: [
      {
        title: faker.music.genre(),
        coursingLevel: faker.random.alphaNumeric(12),
      },
      {
        title: faker.music.genre(),
        coursingLevel: faker.random.alphaNumeric(12),
      },
    ],
  };
  return (
    <PageContainer
      extra={action}
      extraContent={extra(tutor)}
      content={description(tutor)}
      title={`ID Giảng viên: ${tutor.id}`}
    >
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
