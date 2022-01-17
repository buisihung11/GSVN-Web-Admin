import courseApi from '@/api/course';
import { TCourse } from '@/type/course';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import { useHistory } from 'react-router';
import { columns, transformData } from './config';

const CreateCoursePage = () => {
  const { push } = useHistory();
  const handleCreateCourse = async (values: TCourse) => {
    const transformValues = transformData({ ...values });
    const res = await courseApi.create(transformValues);
    push(`/admin/course/${res.data.id}`);
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
