import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Typography, Input, List, Card, Avatar, Space, Button,} from 'antd';
import styles from './AuctionDisplay.less';
import {searchALlAuction} from "@/services/ant-design-pro/api";
import {history} from "umi";
import {PlusOutlined} from "@ant-design/icons";

function flush() {
  history.go(0)

}
const {Paragraph} = Typography;

var AuctionMes: API.AuctionMessage[]
await searchALlAuction(null).then(value => {
  AuctionMes = value;
})



const AuctionDisplay: React.FC = () => {

 // var AuctionMes:API.AuctionMessage[] = searchALlAuction(null);
 //  var AuctionMes: API.AuctionMessage[] = [{
 //    auctionName: 'one',
 //    auctionDescription: '2希望是一个好东西，是最好的，好东西是不会消亡的',
 //    auctionMesUrl: 'http://www.qq.com',
 //    id: '1',
 //    auctionImageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
 //    auctionMoney:"1",
 //    auctionAddMoney:"1"
 //    //auctionDate:
 //  }
 //  ]



  return (

    <PageContainer
      content={
        <div style={{textAlign: 'center'}}>
          <Input.Search
            placeholder="请输入拍卖品信息"
            enterButton="搜索拍卖品"
            size="large"
            onSearch={flush}
            style={{maxWidth: 522, width: '100%'}}
          />
        </div>
      }

    >


      <List.Item>
        <Space size={"middle"}>

          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[0].id}
                                                              src={AuctionMes[0].auctionImageUrl}
                                                              style={{width: 285,height:200}}/>}
                actions={[
                  <a href={AuctionMes[0].auctionMesUrl} target={'_blank'} rel="noreferrer">nihao</a>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[0].auctionName}</a>}
              style={{height:85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random1"/>}
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
                                                              style={{width: 285,height:200}}/>}
                actions={[
                  <a href={AuctionMes[1].auctionMesUrl} target={'_blank'} rel="noreferrer">nihao</a>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[1].auctionName}</a>}
              style={{height:85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random1"/>}
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
                                                              style={{width: 285,height:200}}/>}
                actions={[
                  <a href={AuctionMes[2].auctionMesUrl} target={'_blank'} rel="noreferrer">nihao</a>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[2].auctionName}</a>}
              style={{height:85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random1"/>}
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
                                                              style={{width: 285,height:200}}/>}
                actions={[
                  <a href={AuctionMes[3].auctionMesUrl} target={'_blank'} rel="noreferrer">nihao</a>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[3].auctionName}</a>}
              style={{height:85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random1"/>}
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
      </List.Item>

      <List.Item>
        <Space size={"middle"}>
          <Card className={styles.card} hoverable cover={<img alt={AuctionMes[4].id}
                                                              src={AuctionMes[4].auctionImageUrl}
                                                              style={{width: 285,height:200}}/>}
                actions={[
                  <a href={AuctionMes[4].auctionMesUrl} target={'_blank'} rel="noreferrer">nihao</a>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[4].auctionName}</a>}
              style={{height:85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random1"/>}
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
                                                              style={{width: 285,height:200}}/>}
                actions={[
                  <a href={AuctionMes[5].auctionMesUrl} target={'_blank'} rel="noreferrer">nihao</a>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[5].auctionName}</a>}
              style={{height:85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random1"/>}
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
                                                              style={{width: 285,height:200}}/>}
                actions={[
                  <a href={AuctionMes[6].auctionMesUrl} target={'_blank'} rel="noreferrer">nihao</a>
                ]}>
            <Card.Meta
              title={<a>{AuctionMes[6].auctionName}</a>}
              style={{height:85}}
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random1"/>}
              description={
                <Paragraph className={styles.item} ellipsis={{rows: 2}}>
                  {AuctionMes[6].auctionDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
            </div>
          </Card>

          <a href={"/Admin/AuctionAddManage"}>
          <Button type="dashed" className={styles.newButton} style={{width:285,height:370}}>
            <PlusOutlined /> 新增产品
          </Button>
          </a>
        </Space>
      </List.Item>

    </PageContainer>
  );

}

export default AuctionDisplay;



