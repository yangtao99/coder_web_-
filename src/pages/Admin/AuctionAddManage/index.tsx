import { Card, message } from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import type { FC } from 'react';
//import styles from './index.less';
import {fakeSubmitForm} from "@/services/ant-design-pro/api";

const AuctionAddManage: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
 });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };

  return (
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="拍卖物名"
            name="auctionName"
            rules={[
              {
                required: true,
                message: '请输入拍卖品名',
              },
            ]}
          />
          <ProFormText
            width="md"
            label="拍卖物图片链接"
            name="auctionImageUrl"
            placeholder="请上传一张拍卖物图片，以作展示 Url："
            rules={[
              {
                required: true,
                message: '请输入图片地址',
              },
            ]}
          />
          {/*auctionName:?string*/}
          {/*auctionDescription:?string*/}
          {/*auctionMesUrl:?string*/}
          {/*auctionID:?string*/}
          {/*auctionImageUrl:?string*/}
          <ProFormDateRangePicker
            label="物品预拍期"
            width="md"
            name="auctionDate"
            rules={[
              {
                required: true,
                message: '请选择起止日期',
              },
            ]}
            placeholder={['开始日期', '结束日期']}
          />
          <ProFormTextArea
            label="拍卖商品描述"
            width="xl"
            name="auctionDescription"
            rules={[
              {
                required: true,
                message: '请输入物品描述',
              },
            ]}
            placeholder="请输入你的拍卖物详细信息"
          />
          <ProFormText
            width="md"
            label="拍卖品信息链接"
            name="auctionMesUrl"
            rules={[
              {
                required: true,
                message: '请输入起拍价',
              },
            ]}
            placeholder="拍卖品信息链接 Url："
          />

          <ProFormText
            width="md"
            label="起拍价"
            name="auctionMoney"
            rules={[
              {
                required: true,
                message: '请输入起拍价',
              },
            ]}
            placeholder="请输入起拍价"
          />

          {/*<ProFormTextArea*/}
          {/*  label="起拍价"*/}
          {/*  name="auctionMoney"*/}
          {/*  width="xl"*/}
          {/*  rules={[*/}
          {/*    {*/}
          {/*      required: true,*/}
          {/*      message: '请输入起拍价',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  placeholder="请输入起拍价及定价"*/}
          {/*/>*/}

          {/*<ProFormText*/}
          {/*  width="md"*/}
          {/*  label={*/}
          {/*    <span>*/}
          {/*      客户*/}
          {/*      <em className={styles.optional}>（选填）</em>*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  tooltip="目标的服务对象"*/}
          {/*  name="client"*/}
          {/*  placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"*/}
          {/*/>*/}

          {/*<ProFormText*/}
          {/*  width="md"*/}
          {/*  label={*/}
          {/*    <span>*/}
          {/*      邀评人*/}
          {/*      <em className={styles.optional}>（选填）</em>*/}
          {/*    </span>*/}
          {/*  }*/}
          {/*  name="invites"*/}
          {/*  placeholder="请直接 @姓名／工号，最多可邀请 5 人"*/}
          {/*/>*/}

          <ProFormDigit
            label={
              <span>
                最低加价限额
              </span>
            }
            name="auctionAddMoney"
            placeholder="请输入"
            min={5}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => (value ? value.replace('%', '') : '0'),
            }}
          />

          <ProFormRadio.Group
            options={[
              {
                value: '1',
                label: '公开',
              },
              {
                value: '2',
                label: '部分公开',
              },
              {
                value: '3',
                label: '暂不开放',
              },
            ]}
            label="目标群体"
            name="publicType"
          />
          <ProFormDependency name={['publicType']} >
            {({ publicType }) => {
              return (
                <ProFormSelect
                  placeholder="todo"
                  width="md"
                  name="publicUsers"
                  fieldProps={{
                    style: {
                      margin: '8px 0',
                      display: publicType && publicType === '2' ? 'block' : 'none',
                    },
                  }}
                  options={[
                    {
                      value: '1',
                      label: '甲',
                    },
                    {
                      value: '2',
                      label: '乙',
                    },
                    {
                      value: '3',
                      label: '丙',
                    },
                    {
                      value: '4',
                      label: '丁',
                    },
                    {
                      value: '5',
                      label: '.......',
                    },
                  ]}
                />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Card>

  );
};

export default AuctionAddManage;
