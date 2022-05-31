import { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { searchUsers, deleteUsers, changSex } from '@/services/ant-design-pro/api';
import { Button, Image } from 'antd';

const columns: ProColumns<API.CurrentUser>[] = [
  {
    title:'id',
    dataIndex: 'id',
  //  valueType: 'indexBorder',
    width: 48,
    hideInSearch: true,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
    tooltip: 'id具有唯一性',
  },
  {
    title: '用户账户',
    dataIndex: 'userAccount',
    copyable: true,
    hideInSearch: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100} />
      </div>
    ),
    copyable: true,
    hideInSearch: true,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    hideInSearch: false,
    valueType: 'select',
    valueEnum: {
      0: { text: '男', status: 'Success' },
      1: {
        text: '女',
        status: 'Error',
      },
    },
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    hideInSearch: true,
    valueEnum: {
      0: { text: '正常', status: 'Success' },
      1: {
        text: '异常',
        status: 'default',
      },
    },
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: '用户', status: 'Default' },
      1: {
        text: '管理员',
        status: 'Success',
      },
    },
    hideInSearch: true,
  },
  {
    title: '性别有误？请点击',
    valueType: 'option',
    key: 'option',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (text, record, _, action) => {
      return (
        <div style={{ display: 'inline-flex' }}>
          {
            <Button type="link" onClick={() => changSex(record.id)}>
              重设性别
            </Button>
          }
        </div>
      );
    },
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    render: (text, record, _, action) => {
      return (
        <div style={{ display: 'inline-flex' }}>
          {
            <Button type="link" onClick={() => deleteUsers(record.id)}>
              删除
            </Button>
          }
        </div>
      );
    },
  },
];

//   {
//     title: '操作',
//     valueType: 'option',
//     key: 'option',
//
//     render: (text, record, index, action) => [
//       <a
//         key="editable"
//         onClick={() => {
//           action?.startEditable?.(record.username);
//           deleteUsers(index);
//         }}
//       >
//         删除
//       </a>,
//
//     ],
//   },
// ];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers(params as API.SearchParams);
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'single',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="所有用户"
    />
  );
};
