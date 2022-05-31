import type {FC} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Avatar, Button, Card, List, message, Modal, Tag, Input, Select,Comment} from 'antd';
import styles from './AuctionBag.less';
import {currentUser, queryAuctionBag, removeAuctionBag,} from "@/services/ant-design-pro/api";
import moment from "moment";
import React from "react";
import {useState} from "react";
import {DeleteTwoTone, EyeTwoTone,} from "@ant-design/icons";

//获取登陆用户
var user: API.CurrentUser
await currentUser().then(value => {
  user = value;
})
//拍卖物描述
const ArticleListContent: React.FC<API.ArticleListContentProps> = ({
                                                                     // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                                                     data: {auctionDescription, username},
                                                                   }) => (
  <div className={styles.listContent}>
    <div className={styles.description}> {auctionDescription} </div>
    <div className={styles.extra}>
      {username} 上次浏览于
      <em>{moment(new Date(new Date().getTime()).getTime(),).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);
//顶部欢迎
const PageHeaderContent: FC = () => {
  return (
    <div className={styles.pageHeaderContent}>
      <div className={styles.avatar}>
        <Avatar size="large" src={user.avatarUrl}/>
      </div>
      <div className={styles.content}>
        <div className={styles.contentTitle}>
          欢迎，
          {user.username}
          ，心动不如行动～
        </div>
        <div>
          手机号码 ： {user.phone} - | | - 邮箱 ： {user.email}
        </div>
      </div>
    </div>
  );
};
//顶部侧图
const extraContent = (
  <div className={styles.extraImg}>
    <img
      alt="标题"
      src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
    />
  </div>
);
//获取登陆用户拍卖袋内容
var list: API.AuctionBag[]
await queryAuctionBag({userID: user.id.toString()}).then(value => {
  list = value;
})

const newlist = async (HandleList: API.AuctionBag[]) => {

  await queryAuctionBag({userID: user.id.toString()}).then(value => {
    HandleList = value;
  })
  return HandleList;
}

const AuctionBag: FC = () => {

  // const {Option} = Select;
  // const options = [
  //   {
  //     value: 'zhejiang',
  //     label: 'Zhejiang',
  //     children: [
  //       {
  //         value: 'hangzhou',
  //         label: 'Hangzhou',
  //         children: [
  //           {
  //             value: 'xihu',
  //             label: 'West Lake',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     value: 'jiangsu',
  //     label: 'Jiangsu',
  //     children: [
  //       {
  //         value: 'nanjing',
  //         label: 'Nanjing',
  //         children: [
  //           {
  //             value: 'zhonghuamen',
  //             label: 'Zhong Hua Men',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];
  const [visible, setVisible,] = useState(false);
  const [commitValue, setCommitValue] = useState('');
  const [choice, setChoice] = useState('出价');

  const [listData,setListData] = useState(list) //todo 新内容

//模拟数据
  const mock = [
    {
      username: 'jinlintao',
      userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      content: '大家好',

    }, {
      username: 'jinlintao',
      userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      content: '大家好',

    }, {
      username: 'jinlintao',
      userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      content: '大家好',

    }, {
      username: 'jinlintao',
      userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      content: '大家好',
    }, {
      username: 'jinlintao',
      userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
      content: '大家好',
    }
  ];
  //const mockList: API.AuctionBag[]= [{
  //   id:'1',
  //   username:'jinlintao',
  //   auctionDescription:'1希望是一个好东西1，是最好的，好东西是不会消亡的',
  //   auctionImageUrl:'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  //   auctionMesUrl:'https://www.baidu.com',
  //   auctionName:'马良神尺',
  // },{
  //   id:'2',
  //   username:'jinlintao',
  //   auctionDescription:'1希望是一个好东西1，是最好的，好东西是不会消亡的',
  //   auctionImageUrl:'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  //   auctionMesUrl:'https://www.baidu.com',
  //   auctionName:'马良神尺',
  // },{
  //   id:'3',
  //   username:'jinlintao',
  //   auctionDescription:'1希望是一个好东西1，是最好的，好东西是不会消亡的',
  //   auctionImageUrl:'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  //   auctionMesUrl:'https://www.baidu.com',
  //   auctionName:'马良神尺',
  // },{
  //   id:'4',
  //   username:'jinlintao',
  //   auctionDescription:'1希望是一个好东西1，是最好的，好东西是不会消亡的',
  //   auctionImageUrl:'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  //   auctionMesUrl:'https://www.baidu.com',
  //   auctionName:'马良神尺',
  // }
  //
  // ];
  //const list = data.service
  //const list = mockList;

  //竞拍
  function onCommit() {
    alert('发送中')
    // mock.push({
    //   username: 'jlt',
    //   userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
    //   content: choice + ':' + commitValue
    // })
    alert(mock.length)
  }

  return (
    //顶部内容
    <PageContainer content={<PageHeaderContent/>} extraContent={extraContent}>


      <Card bordered={false}>
        <div className={styles.sizeFont}>我的预购袋</div>
      </Card>

      <Card
        hoverable
        style={{marginTop: 16}}
        bordered={false}
        bodyStyle={{padding: '1px 2px 2px 16px'}}
      >
        <List<API.AuctionBag>
          size="large"
          //loading={loading}
          loading={false}
          rowKey="id"
          itemLayout="vertical"
          // loadMore={loadMoreDom}
          dataSource={listData}//todo 新加了listData
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={<div className={styles.listItemExtra}>
                <Card hoverable
                      cover={<img alt={item.id}
                                  src={item.auctionImageUrl}
                                  width={100} height={120}/>}
                      style={{marginTop: -17}}


                >
                  <Card.Meta
                    description={
                      <div>
                        <Button type="dashed" icon={<DeleteTwoTone/>}
                                style={{position: "absolute", top: 127, right: 25}}
                                onClick={async () => {
                                  let flag = await removeAuctionBag(item.auctionID)
                                  if (flag === -1) {
                                    message.error('重复移除，移除失败')
                                    //alert('重复移除，移除失败')
                                  } else {
                                    message.success('移除成功')
                                    setListData(await newlist(listData))
                                  }
                                }}
                        >
                          移除
                        </Button>

                        <Button type="dashed" icon={<EyeTwoTone/>}
                                style={{position: "absolute", top: 127, left: 30}}
                                onClick={() => setVisible(true)}
                        >
                          进入拍卖
                        </Button>
                      </div>
                    }
                  />
                </Card>

              </div>}
            >
              <List.Item.Meta
                title={
                  <a className={styles.listItemMetaTitle} href={item.auctionMesUrl} target={'_blank'} rel="noreferrer">
                    {item.auctionName}
                  </a>
                }
                description={
                  <span>
                    <Tag style={{color: "pink"}}>第</Tag>
                    <Tag style={{color: "blue"}}>四</Tag>
                    <Tag style={{color: "red"}}>组</Tag>
                    <Tag style={{color: "green"}}>出</Tag>
                    <Tag style={{color: "orange"}}>品</Tag>
                  </span>
                }
              />
              <ArticleListContent data={item}/>
            </List.Item>
          )}
        />


        <Modal
          title={' 欢迎来到 ' + '' + ' 的拍卖场 '}
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          width={1250}
        >
          <List
            className="comment-list"
            header={`共有${mock.length} 条竞价消息发布`}
            itemLayout="horizontal"
            dataSource={mock}
             renderItem={(item) => (
            //     <Comment
            //       author={item.username}
            //       avatar={item.userAvatar}
            //       content={item.content}
            //       datetime={moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}
            //     />
               <div>{item.username}</div>
             )}
          />

          {/*<Input.Group compact>*/}
          {/*  <Select defaultValue="出价" size={"large"}*/}
          {/*          // value={choice}*/}
          {/*          // onChange={(e) => {*/}
          {/*          //   setChoice(e)*/}
          {/*          // }*/}
          {/*          // }*/}
          {/*  >*/}
          {/*    <Option >出价</Option>*/}
          {/*    <Option >评论</Option>*/}
          {/*  </Select>*/}

            {/*<Select defaultValue="Zhejiang">*/}
            {/*    <Option value="Zhejiang">Zhejiang</Option>*/}
            {/*    <Option value="Jiangsu">Jiangsu</Option>*/}
            {/*  </Select>*/}
            {/*  <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />*/}

            {/*<Input style={{width: '90%'}} size={"large"} placeholder="请发表您的出价或评论 enter键发布您的内容"*/}
            {/*       value={commitValue}*/}
            {/*       onChange={(e) => {*/}
            {/*         setCommitValue(e.target.value)*/}
            {/*       }}*/}
            {/*       onPressEnter={() => {*/}
            {/*         onCommit()*/}
            {/*       }}*/}
            {/*/>*/}
            {/*<Input style={{width: '90%'}} size={"large"} placeholder="请发表您的出价或评论 enter键发布您的内容"*/}
            {/*       value={commitValue}*/}
            {/*       onChange={(e) => {*/}
            {/*         setCommitValue(e.target.value)*/}
            {/*       }}*/}
            {/*       onPressEnter={() => {*/}
            {/*         onCommit()*/}
            {/*       }}*/}
            {/*/>*/}

          {/*</Input.Group>*/}
        </Modal>

      </Card>
    </PageContainer>
  );
};


export default AuctionBag;



