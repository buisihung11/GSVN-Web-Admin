import configurationApi from '@/api/configuration';
import { buildParamsWithPro } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Space, Button, Divider } from 'antd';
import { useRef } from 'react';
import { Link, useHistory } from 'umi';

const ConfigurationList = () => {
  const ref = useRef<any>();
  const history = useHistory();

  return (
    <PageContainer>
      <ProTable
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => history.push(`/admin/configuration/create`)}
          >
            Tạo cấu hình
          </Button>,
        ]}
        actionRef={ref}
        search={false}
        request={(...params) =>
          configurationApi.get(buildParamsWithPro(...params)).then((res) => ({
            data: res.data,
            total: res.data.length,
          }))
        }
        columns={[
          {
            title: 'Version',
            dataIndex: 'version',
          },
          {
            title: 'Kích hoạt',
            dataIndex: 'active',
            render: (active) => (active ? 'Kích hoạt' : 'Không'),
          },
          {
            title: 'Hành động',
            width: 200,
            valueType: 'option',
            align: 'center',
            render: (_, data) => (
              <Space direction="horizontal">
                <Button
                  onClick={() =>
                    configurationApi
                      .activeConfiguration(data.version)
                      .then(() => ref.current?.reload())
                  }
                >
                  Kích hoạt
                </Button>
                <Divider type="vertical" />
                <Link to={`/admin/configuration/${data.version}`}>Cập nhật</Link>
              </Space>
            ),
          },
        ]}
      />
    </PageContainer>
  );
};

export default ConfigurationList;
