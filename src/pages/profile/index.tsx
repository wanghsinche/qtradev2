import * as React from 'react';
import { Descriptions, Card, List, Divider } from 'antd';
import { PageContainer, BasicLayoutProps } from '@ant-design/pro-layout';
import './style.less';
import { Link } from 'umi';
import useStore, { APIS, oauth } from './store';
export default (p: BasicLayoutProps) => {
  const store = useStore();
  let dom = <a href={oauth}>login by github</a>;
  if (store.user) {
    dom = (
      <Descriptions>
        <Descriptions.Item label="login">{store.user?.login}</Descriptions.Item>
        <Descriptions.Item label="email">{store.user?.email}</Descriptions.Item>
        <Descriptions.Item label="avatar">
          {store.user ? <img width="40" src={store.user.avatar_url} /> : ''}
        </Descriptions.Item>
        <Descriptions.Item label="token">
          {store.jwt ? (
            store.jwt
          ) : (
            <Button onClick={store.getJWT}>get token</Button>
          )}
        </Descriptions.Item>
      </Descriptions>
    );
  }
  return (
    <PageContainer title={p.route?.name}>
      <Card bordered={false}>
        {dom}
        {store.user && (
          <Divider style={{ marginBottom: 32 }} orientation="left">
            Services:
          </Divider>
        )}
        {store.user && (
          <List>
            <List.Item>
              <Link to="/stock-graphql">stock graphql</Link>
            </List.Item>
          </List>
        )}
      </Card>
    </PageContainer>
  );
};
