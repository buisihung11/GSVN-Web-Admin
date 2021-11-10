import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React from 'react';

const AccountForm = () => {
  return (
    <>
      <ProForm.Group>
        <ProFormText
          label="Email"
          width="md"
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email',
            },
            {
              type: 'email',
              message: 'Email không chính xác',
            },
          ]}
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
