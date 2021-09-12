import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

interface Props {
  updateMode?: boolean;
}

const AccountForm = ({ updateMode }: Props) => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          label="Tên đăng nhập"
          width="md"
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng chọn tên đăng nhập',
            },
          ]}
        />
        <ProFormText.Password
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu',
            },
            {
              min: 6,
              message: 'Ít nhất 6 ký tự',
            },
          ]}
          disabled={updateMode}
          label="Mật khẩu"
          width="md"
          name="password"
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên',
            },
          ]}
          label="Tên đầy đủ"
          width="md"
          name="fullName"
        />
        <ProFormText label="SDT" width="md" name="phone" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          allowClear={false}
          initialValue="female"
          options={[
            {
              label: 'Nam',
              value: 'male',
            },
            {
              label: 'Nữ',
              value: 'female',
            },
            {
              label: 'Khác',
              value: 'preferNo',
            },
          ]}
          label="Giới tính"
          width="md"
          name="gender"
        />
        <ProFormSelect
          allowClear={false}
          options={[
            {
              label: 'Admin',
              value: 'admin',
            },
            {
              label: 'Moderator',
              value: 'moderator',
            },
          ]}
          initialValue="admin"
          label="Quyền"
          width="md"
          name="role"
        />
      </ProForm.Group>
    </>
  );
};

export default AccountForm;
