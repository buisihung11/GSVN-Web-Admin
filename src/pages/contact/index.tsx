import contactApi from '@/api/contact';
import { buildParamsWithPro } from '@/api/utils';
import { ContactRequestStatus, ContactType } from '@/type/contact';
import { ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Space } from 'antd';
import { useRef } from 'react';

const ContactRequestPageList = () => {
  const ref = useRef<ActionType>();

  const onUpdateStatus = async (id: number, values: any) => {
    try {
      await contactApi.update(id, values);
      ref.current?.reload();
      return true;
    } catch (error) {
      return false;
    }
  };

  const columns: ProColumns[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      hideInSearch: true,
      width: 100,
    },
    {
      title: 'Tên người gửi',
      dataIndex: 'name',
      hideInSearch: true,
      width: 250,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      hideInSearch: true,
      width: 250,
    },
    {
      title: 'Loại',
      dataIndex: 'class',
      width: 250,
      valueType: 'select',
      sorter: true,
      valueEnum: {
        [ContactType.CONTACT_TUTOR]: {
          text: 'Liên lạc với giảng viên',
        },
        [ContactType.INFORNEWTUTOR]: {
          text: 'Thông báo khi có giảng viên',
        },
        [ContactType.PARTNER]: {
          text: 'Đối tác',
        },
        [ContactType.SUPPORT]: {
          text: 'Hỗ trợ',
        },
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: 250,
      valueType: 'select',
      sorter: true,
      valueEnum: {
        [ContactRequestStatus.CONTACTED]: {
          text: 'Đã liên lạc',
        },
        [ContactRequestStatus.FAIL_TO_CONTACT]: {
          text: 'Không thể liên lạc',
        },
        [ContactRequestStatus.NEW]: {
          text: 'Mới',
        },
      },
    },
    {
      title: 'Tin nhắn',
      dataIndex: 'message',
      valueType: 'textarea',
      width: 300,
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'createdAt',
      valueType: 'dateTime',
      sorter: true,
      width: 200,
    },

    {
      title: 'Hành động',
      width: 200,
      valueType: 'option',
      align: 'center',
      fixed: 'right',
      render: (_, data) => (
        <Space>
          <ModalForm
            onFinish={(values) => onUpdateStatus(data.id, values)}
            title="Cập nhật trạng thái"
            trigger={<Button>Cập nhật</Button>}
          >
            <ProFormSelect
              width="md"
              options={[
                {
                  label: 'Đã liên lạc',
                  value: ContactRequestStatus.CONTACTED,
                },
                {
                  label: 'Không thể liên lạc',
                  value: ContactRequestStatus.FAIL_TO_CONTACT,
                },
                {
                  label: 'Mới',
                  value: ContactRequestStatus.NEW,
                },
              ]}
              name="status"
              label="Trạng thái"
            />
            <ProFormTextArea width="md" name="feedback" label="Phản hồi" />
          </ModalForm>
          <a href={`mailto:${data.email}?subject=Phản hồi từ Gia Sư Việt Nam&body=Message`}>
            Phản hồi
          </a>
          {/* <Dropdown.Button
            overlay={
              <Menu>
                <Menu.Item key="1"></Menu.Item>
                <Menu.Item key="2"></Menu.Item>
              </Menu>
            }
          >
            <Link to={`/admin/email-template/${data.id}`}>Chi tiết</Link>
          </Dropdown.Button> */}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={ref}
        scroll={{ x: 800 }}
        search={{
          layout: 'vertical',
        }}
        request={(...params) =>
          contactApi.get(buildParamsWithPro(...params)).then((res) => ({
            data: res.data.items,
            total: res.data.items.length,
          }))
        }
        columns={columns}
      />
    </PageContainer>
  );
};

export default ContactRequestPageList;
