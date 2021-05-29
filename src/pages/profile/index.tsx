import * as React from 'react';
import { Descriptions, Card, List, Divider } from 'antd';
import { PageContainer, BasicLayoutProps } from '@ant-design/pro-layout';
import './style.less';
import useStore, { APIS } from './store';
export default (p:BasicLayoutProps) => {
    const store = useStore();
    let dom = <a href={APIS.oauth}>login by github</a>;
    if (store.user) {
        dom = <Descriptions>
            <Descriptions.Item label="login">{store.user?.login}</Descriptions.Item>
            <Descriptions.Item label="email">{store.user?.email}</Descriptions.Item>
            <Descriptions.Item label="avatar">{store.user ? <img width="40" src={store.user.avatar_url} /> : ''}</Descriptions.Item>
        </Descriptions>;
    }
    return <PageContainer title={p.route?.name}>
        <Card bordered={false}>
        {dom}
        {store.user &&
        <Divider style={{ marginBottom: 32 }} orientation="left">Services:</Divider>
        }
        {store.user && 
        <List>
            <List.Item>
                <a href={APIS.graphQL} target="blank">stock graphql</a>
            </List.Item>
        </List>
        }
        </Card>
        </PageContainer>;
}
