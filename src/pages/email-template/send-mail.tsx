import emailApi from '@/api/email';
import emailTemplateApi from '@/api/emailTemplate';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { SendEmailRoleEnum } from '@/type/email-template';
import ProForm, { ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';

const SendMailPage = () => {
  const handleSendEmail = async (values: any) => {
    console.log(values);
    await emailApi.sendEmail(values);
    return true;
  };

  return (
    <PageContainer>
      <Card>
        <ProForm
          initialValues={{
            isForce: true,
          }}
          submitter={{
            searchConfig: {
              submitText: 'Gửi',
            },
          }}
          onFinish={handleSendEmail}
        >
          <ProForm.Group>
            <ProFormText name="subject" label="Tiêu đề" width="md" />
            <ProForm.Group>
              <ProFormSelect
                // disabled={isForce}
                mode="multiple"
                name="roles"
                label="Gửi cho"
                required
                width="sm"
                options={[
                  {
                    label: 'Toàn bộ học sinh',
                    value: SendEmailRoleEnum.STUDENT,
                  },
                  {
                    label: 'Toàn bộ giảng viên',
                    value: SendEmailRoleEnum.TUTOR,
                  },
                  {
                    label: 'Toàn bộ nhân viên',
                    value: SendEmailRoleEnum.MODERATOR,
                  },
                  {
                    label: 'Toàn bộ admin',
                    value: SendEmailRoleEnum.ADMINISTRATOR,
                  },
                ]}
              />
              <ProFormSwitch
                tooltip="Bao gồm cả những người không đăng ký newsletter"
                name="isForce"
                label="Gửi cho tất cả"
                width="sm"
              />
            </ProForm.Group>
          </ProForm.Group>
          <ProFormSelect
            name="templateId"
            label="Chọn từ mẫu email"
            width="md"
            request={(params) => {
              return emailTemplateApi.get(params).then((res) =>
                res.data.map((d) => ({
                  label: d.subject,
                  value: d.id,
                })),
              );
            }}
          />
          <ProForm.Item label="Hoặc soạn nội dung mới" name="content">
            <ResoEditor />
          </ProForm.Item>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default SendMailPage;
