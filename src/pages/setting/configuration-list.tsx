import configurationApi from '@/api/configuration';
import { buildParamsWithPro } from '@/utils/utils';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Space } from 'antd';
import React from 'react';
import { Link } from 'umi';

const ConfigurationList = () => {
  return (
    <PageContainer>
      <ProTable
        // actionRef={ref}
        scroll={{ x: 800 }}
        search={{
          layout: 'vertical',
        }}
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
          },
          {
            title: 'Hành động',
            width: 200,
            valueType: 'option',
            align: 'center',
            render: (_, data) => (
              <Space direction="horizontal">
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
