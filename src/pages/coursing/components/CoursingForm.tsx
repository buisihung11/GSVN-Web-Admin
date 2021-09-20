import { ProFormText } from '@ant-design/pro-form';

const CoursingForm = () => {
  return (
    <>
      <ProFormText
        label="Tên môn học"
        width="md"
        name="coursingTitle"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn tên môn học',
          },
        ]}
      />
    </>
  );
};

export default CoursingForm;
