import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { PageContainer, BasicLayoutProps } from '@ant-design/pro-layout';
import { Link } from 'umi';
const txt = `
## [AKShare](https://github.com/jindaxiang/akshare) 

[![Data: akshare](https://img.shields.io/badge/Data%20Science-AKShare-green)](https://github.com/jindaxiang/akshare)

[AKShare](https://github.com/jindaxiang/akshare) 主要是用于财经研究，解决在财经研究中数据获取的问题。目前的版本主要是基于 Python 语言，通过调用相关的
数据接口来获取数据到本地。原理上，就是在用户本地运行 Python 代码，实时从网络采集数据到本地，便利与数据分析。由于网络数据采集需要维护的接口众多，且经常由于目标网站变换
网页格式需要维护及更新相关接口，所以用户在使用本项目的过程中需要经常更新本项目到最新版本。同时也需要关注项目文档的更新，因为最新的使用方式和接口变更都会第一时间更新到文档中。

## GraphQL API

A GraphQL server built with Ariadne™ to query financial data from AKShare™

- Endpoint is \`/proxy/graphql\`
- Query arguments can be found from AKShare
- Every request requires a \`ok-token\` field with JWT value in header or cookie to access the server  
- The JWT token can be found from [Profile](/profile) Page
`;

export default (p: BasicLayoutProps) => {
  return (
    <PageContainer>
      <ReactMarkdown>{txt}</ReactMarkdown>
      <Link to="/akshare/graphql">Go To GraphQL Playground</Link>
      <div style={{ margin: '40px 0' }}></div>
    </PageContainer>
  );
};
