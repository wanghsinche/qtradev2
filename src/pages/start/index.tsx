import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Divider } from 'antd';
import { PageContainer, BasicLayoutProps } from '@ant-design/pro-layout';
import useStore, { APIS, oauth } from '@/pages/profile/store';

const txt = `
## QTrade-V2

[![QTrade: V2](https://img.shields.io/badge/QTrade-V2-blue)](https://github.com/wanghsinche/qtrade-v2)

QTrade, wanghsinche 的自用策略+数据一站式平台

目前包括

- AKShare GraphQL 接口，方便webapp直接调用AKShare的数据，免去搭设python环境或RPC调用的麻烦
- QDII溢价研究

`;

export default (p: BasicLayoutProps) => {
  const store = useStore();
  const dom = (
    <div style={{ margin: '40px 0' }}>
      <Divider orientation="left">请登入：</Divider>
      <a href={oauth} title="login github">
        <img
          src="https://img.shields.io/badge/login%20-github-white"
          alt="login github"
        />
      </a>
    </div>
  );

  return (
    <PageContainer>
      <ReactMarkdown>{txt}</ReactMarkdown>
      {store.user?.login ? '' : dom}
    </PageContainer>
  );
};
