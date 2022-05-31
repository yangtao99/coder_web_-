import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography } from 'antd';
import styles from './Welcome.less';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Alert
          message={'小组成员：章子彬 金林涛 欧阳嘉豪 李茗阳'}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          世界上最好的在线拍卖网站！！！{' '}
          <a
            href="http://www.jltfxy.top"
          >
            欢迎使用
          </a>
        </Typography.Text>
        <CodePreview>www.jltfxy.top</CodePreview>
        <Typography.Text strong>
          项目 github地址 {' '}
          <a
            href="https://github.com/yangtao99"
          >
            欢迎指正
          </a>
        </Typography.Text>
        <CodePreview>后端（java）：https://github.com/yangtao99/coder-web--.git</CodePreview>
        <CodePreview>https://github.com/yangtao99/coder_web_-.git</CodePreview>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
