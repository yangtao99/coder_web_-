import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {
  Typography,
  Input,
  Card,
  Avatar,
  Space,
  Button,
  message,
  Modal,
  List,
  Alert,
  Divider,
} from 'antd';
import styles from './AuctionDisplay.less';
import {
  AddAuctionBag,
  addAuctionComment,
  currentUser, queryAuctionComment,
  searchALlAuction,
  searchAuction
} from "@/services/ant-design-pro/api";
import {
  AccountBookTwoTone,
  PlusOutlined,
} from "@ant-design/icons";



const {Paragraph} = Typography;

const mock: API.commentValue[] = [
  {
    username: 'jinjinjin',
    userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png',
//    content: '在座的各位都是大神',
    price:'1000'
  }, {
    username: 'oyjh111',
    userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
    content: '  我出一千万',
    price: '',
  }, {
    username: 'kobe-bryant',
    userAvatar: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
    content: '  大家别跟我抢',
    price: '',
  }, {
    username: 'linlinlin',
    userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
//    content: '定个小目标，今晚花三个亿',
    price: '1800',

  }, {
    username: 'Jordan',
    userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    content: '  今晚全场的消费 由赵公子买单',
    price: '',
  }
];

var user: API.CurrentUser
await currentUser().then(value => {
  user = value;
})

var AuctionMes: API.AuctionMessage[]
if (AuctionMes === undefined) {
  await searchALlAuction(null).then(value => {
    AuctionMes = value;
  })
}

async function onSearch(searchValue: API.SearchAuctionParams | null) {
  //alert(searchValue)
  await searchAuction(searchValue).then(value => {
    AuctionMes = value;
  });
  history.go(0);
}

async function onAdd(addValue: API.AddAuctionBagParams) {
  //alert(searchValue)
  let flag: number = await AddAuctionBag(addValue);
  if (flag === -1) {
    message.error('加购失败，该商品已存在于您的预购袋')
  } else {
    message.success('成功加入预购袋')
  }
}

function maxPrice(temp: API.commentValue[]): number {
  let value = 0;
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].price){
      let tempPrice = temp[i].price;
      if (parseInt(tempPrice) > value){
        value = parseInt(tempPrice);
      }
    }
  }
  return value;
}
function maxUser(value: number,temp: API.commentValue[]): string {
  for (let i = 0; i < temp.length; i++) {
    if(temp[i].price){
    if (parseInt(temp[i].price)===value)
      return temp[i].username
  }
  }
}

var allComment: API.commentValue[] = [];
async function getAllComment(params: string) {
  await queryAuctionComment(params).then(value => {
    allComment = value;
  })
}

const newComment = (tempComment: API.commentValue[]) =>{

   function getAllComment(params: string) {
     queryAuctionComment(params).then(value => {
      tempComment = value;
    })
  }
  return tempComment;
}

function handleForm(str: string): string{
  if(str!==''){
    return '出价:   ' + str;
  }
}

//
// var user: API.CurrentUser
// await currentUser().then(value => {
//   user = value;
// })



const AuctionDisplay: React.FC = () => {




  getAllComment(AuctionMes[0].id)

  const [visible, setVisible,] = useState(false);
  const [visible1, setVisible1,] = useState(false);

  const [comments , setComments] = useState({});
  const [commitValue, setCommitValue] = useState('');

  const [commentData,setCommentData] = useState(allComment);

  // const [allComments, setAllComments] = useState({});

//   const { Option } = Select;
//
//   const options = [
//     {
//       value: '出价',
//       label:'出价',
//     },
//     {
//       value: '评论',
//       label:'评论',
//     }
// ]
    //const {Option} = Select;



  function onCommit() {
    let tempPrice = '';
    let tempContent = '';
    if (commitValue.charAt(0) === '#'){
      if(isNaN(parseInt(commitValue.substring(1)))){
        alert('出价格式不正确 需为数字')
        return
      }
      if (parseInt(commitValue.substring(1)) < maxPrice(allComment)){
        alert('您的出价低于拍卖物价格')
        return
      }
      tempPrice =  commitValue.substring(1);
    }else {
      tempContent =  commitValue;
    }
    mock.push({
      username: 'jinlintao',
      userAvatar: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png',
      price: tempPrice,
      content: tempContent,
    })
    setCommitValue('')
  }


  async function onCommit1() {
    setCommentData(newComment(allComment));
    let tempPrice = '';
    let tempContent = '';
    if (commitValue.charAt(0) === '#') {
      if (isNaN(parseInt(commitValue.substring(1)))) {
        alert('出价格式不正确 需为数字')
        return
      }
      if (parseInt(commitValue.substring(1)) < maxPrice(allComment)) {
        alert('您的出价低于拍卖物价格')
        return
      }
      tempPrice = commitValue.substring(1);
    } else {
      tempContent = commitValue;
    }
    // alert(comments.id)
    // alert(user.username)
    // alert(user.avatarUrl)
    // alert(tempPrice)
    // alert(tempContent)
    await addAuctionComment({
      username: user.username,
      userAvatar: user.avatarUrl,
      auctionID: comments.id.toString(),
      price: tempPrice,
      content: tempContent,
    })
    setCommentData(newComment(allComment));
    setCommitValue('')
  }
//todo 尽量写多注释
//todo 尝试解决竞拍问题
//todo 其他课程作业
  return (


    <PageContainer
      content={
        <div style={{textAlign: 'center'}}>
          <Input.Search
            placeholder="请输入拍卖品信息"
            enterButton="搜索拍卖品"
            size="large"
            onSearch={onSearch}
            //onSearch={flush(this.value)}
            style={{maxWidth: 522, width: '100%'}}
          />
        </div>

      }
    >

      <Modal
        title={' 1欢迎来到1 ' + comments.auctionName + ' 的拍卖场 ' }
        centered
        visible={visible1}
        onOk={() => setVisible1(false)}
        onCancel={() => setVisible1(false)}
        width={1250}
      >
        <Divider style={{color:"red"}}> 禁止发送与拍卖无关的内容 </Divider>
        <Divider style={{color:"orange"}}> 当前最高出价  :   {maxPrice(allComment)}  出价人   :      {maxUser(maxPrice(allComment),allComment)}</Divider>

        <List
          className="comment-list"
          header={`共有${allComment.length} 条竞价消息发布`}
          itemLayout="horizontal"
          dataSource={commentData}
          renderItem={(item) => (
            <div>
              {/*<Comment*/}
              {/*    author={item.username}*/}
              {/*    avatar={item.userAvatar}*/}
              {/*    content={item.content}*/}
              {/*    datetime={moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}*/}
              {/*  />*/}
              <Card  style={{width:'100%'}}>
                <Avatar shape="square" size={48} src={item.userAvatar}></Avatar>
                <span style={{fontSize:"x-large",display:"inline-block",marginTop:5,marginLeft:12}}> {' : '}  {item.content}  </span>
                <span style={{fontSize:"x-large",display:"inline-block",marginTop:5,marginLeft:12,color:"orange"}}>   {handleForm(item.price)}  </span>
                <div>{item.username}</div>
              </Card>
            </div>
          )}
        />
        <Alert
          message={'理性拍卖，谨慎出价'}
          type="warning"
          showIcon
          banner
          style={{
            marginBottom: 10,
          }}
        />
        {/*<Select defaultValue="出价" size={"large"}*/}
        {/*        // value={choice}*/}
        {/*        // onChange={(e) => {*/}
        {/*        //   setChoice(e)*/}
        {/*        // }*/}
        {/*        // }*/}
        {/*>*/}
        {/*  <Option value = "出价">出价</Option>*/}
        {/*  <Option value = "评论">评论</Option>*/}
        {/*</Select>*/}

        {/*<Select defaultValue="Zhejiang">*/}
        {/*    <Option value="Zhejiang">Zhejiang</Option>*/}
        {/*    <Option value="Jiangsu">Jiangsu</Option>*/}
        {/*  </Select>*/}
        {/*  <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />*/}


        <Input style={{width: '100%'}} size={"large"} placeholder="请发表您的出价或评论     #100表示出价100    *双击enter键发布您的内容* "
               value={commitValue}
               onChange={(e) => {
                 setCommitValue(e.target.value)
               }}
               onPressEnter={() => {
                 onCommit1()

               }}
        />

      </Modal>

      <Modal
        title={' 欢迎来到 ' + comments.auctionName + ' 的拍卖场 '}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1250}
      >
        <Divider style={{color:"red"}}> 禁止发送与拍卖无关的内容 </Divider>
        <Divider style={{color:"orange"}}> 当前最高出价  :   {maxPrice(mock)}  出价人   :      {maxUser(maxPrice(mock),mock)}</Divider>


        <List
          className="comment-list"
          header={`共有${mock.length} 条竞价消息发布`}
          itemLayout="horizontal"
          dataSource={mock}
          renderItem={(item) => (
            <div>
              {/*<Comment*/}
              {/*    author={item.username}*/}
              {/*    avatar={item.userAvatar}*/}
              {/*    content={item.content}*/}
              {/*    datetime={moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}*/}
              {/*  />*/}
              <Card  style={{width:'100%'}}>
                <Avatar shape="square" size={48} src={item.userAvatar}></Avatar>
                <span style={{fontSize:"x-large",display:"inline-block",marginTop:5,marginLeft:12}}> {' : '}  {item.content}  </span>
                <span style={{fontSize:"x-large",display:"inline-block",marginTop:5,marginLeft:12,color:"orange"}}>   {handleForm(item.price)}  </span>
                <div>{item.username}</div>
              </Card>
            </div>
            )}
        />
        <Alert
          message={'理性拍卖，谨慎出价'}
          type="warning"
          showIcon
          banner
          style={{
            marginBottom: 10,
          }}
        />
          {/*<Select defaultValue="出价" size={"large"}*/}
          {/*        // value={choice}*/}
          {/*        // onChange={(e) => {*/}
          {/*        //   setChoice(e)*/}
          {/*        // }*/}
          {/*        // }*/}
          {/*>*/}
          {/*  <Option value = "出价">出价</Option>*/}
          {/*  <Option value = "评论">评论</Option>*/}
          {/*</Select>*/}

        {/*<Select defaultValue="Zhejiang">*/}
        {/*    <Option value="Zhejiang">Zhejiang</Option>*/}
        {/*    <Option value="Jiangsu">Jiangsu</Option>*/}
        {/*  </Select>*/}
        {/*  <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />*/}

        <Input style={{width: '100%'}} size={"large"} placeholder="请发表您的出价或评论     #100表示出价100    *enter键发布您的内容* "
               value={commitValue}
               onChange={(e) => {
                 setCommitValue(e.target.value)
               }}
               onPressEnter={() => {
                 onCommit()
               }}
        />

      </Modal>

      <div id={'key'}>

        <Space size={"middle"}>

          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[0].id}
                                                              src={AuctionMes[0].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={ () => [  setComments(AuctionMes[0]), getAllComment(AuctionMes[0].id), setVisible1(true),setCommentData(newComment(allComment))
                            ]}
                         // onClick={ () => [ setVisible1(true), setComments(AuctionMes[0]), getAllComment(AuctionMes[0].id)]}
                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[0].auctionName,
                    auctionDescription: AuctionMes[0].auctionDescription,
                    auctionID: AuctionMes[0].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[0].auctionImageUrl,
                    auctionMesUrl: AuctionMes[0].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}
          >
            <Card.Meta
              title={<a>{AuctionMes[0].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random21"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[0].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>

          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[1].id}
                                                              src={AuctionMes[1].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[1])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[1].auctionName,
                    auctionDescription: AuctionMes[1].auctionDescription,
                    auctionID: AuctionMes[1].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[1].auctionImageUrl,
                    auctionMesUrl: AuctionMes[1].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[1].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random6"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[1].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>

          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[2].id}
                                                              src={AuctionMes[2].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[2])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[2].auctionName,
                    auctionDescription: AuctionMes[2].auctionDescription,
                    auctionID: AuctionMes[2].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[2].auctionImageUrl,
                    auctionMesUrl: AuctionMes[2].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[2].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random5"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[2].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>


          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[3].id}
                                                              src={AuctionMes[3].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[3])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[3].auctionName,
                    auctionDescription: AuctionMes[3].auctionDescription,
                    auctionID: AuctionMes[3].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[3].auctionImageUrl,
                    auctionMesUrl: AuctionMes[3].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[3].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random4"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[3].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>
        </Space>

        <br/>
        <Space size={"middle"}>

          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[4].id}
                                                              src={AuctionMes[4].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[4])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[4].auctionName,
                    auctionDescription: AuctionMes[4].auctionDescription,
                    auctionID: AuctionMes[4].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[4].auctionImageUrl,
                    auctionMesUrl: AuctionMes[4].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}
          >
            <Card.Meta
              title={<a>{AuctionMes[4].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random11"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[4].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>

          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[5].id}
                                                              src={AuctionMes[5].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[5])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[5].auctionName,
                    auctionDescription: AuctionMes[5].auctionDescription,
                    auctionID: AuctionMes[5].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[5].auctionImageUrl,
                    auctionMesUrl: AuctionMes[5].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[5].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random16"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[5].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>

          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[6].id}
                                                              src={AuctionMes[6].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[6])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[6].auctionName,
                    auctionDescription: AuctionMes[6].auctionDescription,
                    auctionID: AuctionMes[6].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[6].auctionImageUrl,
                    auctionMesUrl: AuctionMes[6].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[6].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random15"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[6].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>


          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[7].id}
                                                              src={AuctionMes[7].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[7])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[7].auctionName,
                    auctionDescription: AuctionMes[7].auctionDescription,
                    auctionID: AuctionMes[7].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[7].auctionImageUrl,
                    auctionMesUrl: AuctionMes[7].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[7].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random14"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[7].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>
        </Space>

        <br/>

        <Space size={"middle"}>
          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[8].id}
                                                              src={AuctionMes[8].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[8])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[8].auctionName,
                    auctionDescription: AuctionMes[8].auctionDescription,
                    auctionID: AuctionMes[8].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[8].auctionImageUrl,
                    auctionMesUrl: AuctionMes[8].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[8].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random3"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[8].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>

          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[9].id}
                                                              src={AuctionMes[9].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[9])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[9].auctionName,
                    auctionDescription: AuctionMes[9].auctionDescription,
                    auctionID: AuctionMes[9].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[9].auctionImageUrl,
                    auctionMesUrl: AuctionMes[9].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[9].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random2"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[9].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>
          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[10].id}
                                                              src={AuctionMes[10].auctionImageUrl}
                                                              style={{width: 285, height: 200}}/>}
                actions={[
                  <Button type="dashed" icon={<AccountBookTwoTone />}
                          onClick={() => [setVisible(true), setComments(AuctionMes[10])]}


                  >进入竞拍</Button>,
                  <Button type="dashed" icon={<AccountBookTwoTone/>} onClick={() => onAdd({
                    username: user.username,
                    auctionName: AuctionMes[10].auctionName,
                    auctionDescription: AuctionMes[10].auctionDescription,
                    auctionID: AuctionMes[10].id,
                    userID: user.id.toString(),
                    auctionImageUrl: AuctionMes[10].auctionImageUrl,
                    auctionMesUrl: AuctionMes[10].auctionMesUrl,
                  })}>加入预购袋</Button>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[10].auctionName}</a>}
              style={{height: 85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random1"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[10].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>

          <a href={"/Admin/AuctionAddManage"}>
            <Button type="dashed" className={styles.newButton} style={{width: 285, height: 370}}>
              <PlusOutlined/> 新增产品
            </Button>
          </a>
        </Space>

      </div>

    </PageContainer>
  );

}

export default AuctionDisplay;



