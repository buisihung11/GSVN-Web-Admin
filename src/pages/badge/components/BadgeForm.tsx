import UploadFile from '@/components/Upload/UploadFile';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const BadgeForm = () => {
  return (
    <>
      <ProForm.Group>
        <ProForm.Item label="Hình ảnh" name="imageUrl">
          <UploadFile accept="image/*" style={{ height: '100%' }} />
        </ProForm.Item>
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
