import courseApi from '@/api/course';
import { TCourse } from '@/type/course';
import useRequest from '@ahooksjs/use-request';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Empty } from 'antd';
import { IRouteComponentProps } from 'umi';
import { columns, normalizeData, transformData } from './config';

const UpdateCoursePage = ({ match }: IRouteComponentProps<{ courseId: string }>) => {
  const {
    params: { courseId },
  } = match;

  const { data } = useRequest<TCourse>(
    () =>
      courseApi
        .getById(+courseId)
        .then((res) => res.data)
        .then((res) => normalizeData(res)),
    {
      ready: Boolean(courseId),
    },
  );

  const course = data as TCourse;
  console.log(`course`, course);
  const handleUpdateCourse = async (values: TCourse) => {
    const transformValues = transformData({ ...course, ...values });
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
