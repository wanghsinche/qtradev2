import * as React from 'react';
import { Descriptions, Card, List, Divider, Button, Input, Space } from 'antd';
import { PageContainer, BasicLayoutProps } from '@ant-design/pro-layout';
import './style.less';
import { Link } from 'umi';
import useStore, { APIS, oauth } from './store';
export default (p: BasicLayoutProps) => {
  const store = useStore();
  if (!store.user) {
    return (
      <PageContainer title={p.route?.name}>
        <Card bordered={false}>
          <a href={oauth}>
            <Button>login with github</Button>
          </a>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={p.route?.name}>
      <Card bordered={false}>
        <Descriptions>
          <Descriptions.Item label="login">
            {store.user?.login}
          </Descriptions.Item>
          <Descriptions.Item label="email">
            {store.user?.email}
          </Descriptions.Item>
          <Descriptions.Item label="avatar">
            <img width="40" src={store.user.avatar_url} />
          </Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} orientation="left">
          Important:
        </Divider>
        <Descriptions>
          <Descriptions.Item label="token">
            {store.jwt ? (
              <Input value={store.jwt} disabled={true} />
            ) : (
              <Button onClick={store.getJWT}>get token</Button>
            )}
          </Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 32 }} orientation="left">
          Services:
        </Divider>
        <List>
          <List.Item>
            <Card
              size="small"
              title="Stock GraphQL"
              extra={<Link to="/stock-graphql">Go To</Link>}
              style={{ width: 300 }}
            >
              <p>stock graphql</p>
            </Card>
          </List.Item>
        </List>
      </Card>
    </PageContainer>
  );
};

export const Head = () => {
  const store = useStore();
  if (!store.user) {
    return <div>Hi, Guess</div>;
  }

  return (
    <Space>
      <span>Hi, {store.user.login}</span>
      <img width="30" src={store.user.avatar_url}></img>
      <a href={APIS.logout}>logout</a>
    </Space>
  );
};
