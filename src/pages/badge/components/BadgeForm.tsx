import ProForm, { ProFormText, ProFormUploadDragger } from '@ant-design/pro-form';

interface Props {}

const BadgeForm = (props: Props) => {
  return (
    <>
      <ProForm.Group>
        <ProFormUploadDragger
          title="Hình ảnh"
          description="Kéo thả hình ảnh vào đây"
          width="md"
          name="imageUrl"
        />
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên',
            },
          ]}
          label="Tên"
          width="md"
          name="title"
        />
      </ProForm.Group>
    </>
  );
};

export default BadgeForm;
