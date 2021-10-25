import { ProFormText, ProFormList, ProFormDigit } from '@ant-design/pro-form';

const CoursingForm = ({ updateMode }: { updateMode?: boolean }) => {
  return (
    <>
      <ProFormText
        label="Tên môn học"
        width="md"
        name="title"
        rules={[
          {
            required: true,
            message: 'Vui lòng chọn tên môn học',
          },
        ]}
      />
      {updateMode && <ProFormDigit name="id" hidden />}
      <ProFormList
        label="Cấp bậc môn học"
        name="coursingLevels"
        creatorButtonProps={{
          position: 'bottom',
          creatorButtonText: 'Thêm Cấp bậc',
        }}
      >
        {updateMode && <ProFormText name="id" hidden />}
        {updateMode && <ProFormText name="coursingId" hidden />}
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên',
            },
          ]}
          name="name"
          label="Tên Cấp bậc"
          placeholder="Cấp 1, cấp 2,..."
          width="md"
        />
      </ProFormList>
    </>
  );
};

export default CoursingForm;
