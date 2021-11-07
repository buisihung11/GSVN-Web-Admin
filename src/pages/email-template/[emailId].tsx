import emailTemplateApi from '@/api/emailTemplate';
import ResoEditor from '@/components/ResoEditor/ResoEditor';
import { TCourse } from '@/type/course';
import { EmailTemplate } from '@/type/email-template';
import useRequest from '@ahooksjs/use-request';
import ProForm, { BetaSchemaForm, ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Empty, Space, Typography } from 'antd';
import { useRef } from 'react';
import ReactQuill from 'react-quill';
import { IRouteComponentProps } from 'umi';
import { columns } from './columns';

const UpdateEmailTemplatePage = ({ match }: IRouteComponentProps<{ emailId: string }>) => {
  const {
    params: { emailId },
  } = match;

  console.log(`emailId`, emailId);
  const { data } = useRequest<TCourse>(
    () => emailTemplateApi.getById(+emailId),

    {
      ready: Boolean(emailId),
    },
  );

  const emailTemplate = data as TCourse;

  const handleUpdateEmailTemplate = async (values: EmailTemplate) => {
    await emailTemplateApi.update(emailTemplate?.id, values);
    return true;
  };
  const editorRef = useRef<ReactQuill>();

  const onAddEmbedContent = async ({ model }: { model: string }) => {
    console.log(`editorRef`, editorRef);
    const quill = editorRef.current?.getEditor();
    console.log(`quill`, quill);
    if (!quill) return;
    const range = quill.getSelection(true);

    // Insert temporary loading placeholder image
    quill.insertText(range.index, `{{ ${model} }}`);
    return true;
  };

  // if (loading) {
  //   return <Spin />;
  // }

  if (!emailTemplate) {
    return <Empty description="không tìm thấy Khóa học" />;
  }

  return (
    <PageContainer>
      <Card>
        <ProForm
          initialValues={emailTemplate}
          submitter={{
            searchConfig: {
              submitText: 'Tạo',
            },
          }}
          onFinish={handleUpdateEmailTemplate}
        >
          <BetaSchemaForm layoutType="Embed" columns={columns} />
          <ProForm.Item
            label={
              <Space>
                <Typography>Nội dung bài viết</Typography>
                <ModalForm
                  title="Nhúng nội dung"
                  onFinish={onAddEmbedContent}
                  trigger={<Button type="dashed">Nhúng nội dung</Button>}
                >
                  <ProFormSelect
                    name="model"
                    label="Chọn nội dung muốn nhúng"
                    width="md"
                    options={[
                      {
                        label: 'Tên người dùng',
                        value: 'Model.User.FullName',
                      },
                      {
                        label: 'Mã đơn hàng',
                        value: 'Model.Order.Id',
                      },
                      {
                        label: 'Số giờ',
                        value: 'Model.Order.HoursPerWeek',
                      },
                      {
                        label: 'Hình thức học',
                        value: 'Model.Order.TeachForm',
                      },
                      {
                        label: 'Môn học',
                        value: 'Model.Order.CoursingTitle',
                      },
                      {
                        label: 'Cấp bậc',
                        value: 'Model.Order.CoursingLevel',
                      },
                      {
                        label: 'Tổng tiền',
                        value: 'Model.Order.FinalAmount',
                      },
                    ]}
                  />
                </ModalForm>
              </Space>
            }
            name="content"
          >
            <ResoEditor ref={editorRef} />
          </ProForm.Item>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default UpdateEmailTemplatePage;
