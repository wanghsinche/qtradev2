import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { Divider, Card, Row, Col } from 'antd';
import { PageContainer, BasicLayoutProps } from '@ant-design/pro-layout';
import useStore, { APIS, oauth } from '@/pages/profile/store';
import { Link } from 'umi';

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

  const services = (
    <div>
      <Divider orientation="left">Data</Divider>
      <Row>
        <Col span="6">
          <Card title="AKShare">
            <Link to="/akshare/intro">AKShare</Link>
            <p>AKShare introduction</p>
          </Card>
        </Col>
      </Row>
      <Divider orientation="left">Strategy</Divider>
      <Row>
        <Col span="6">
          <Card title="QDII Premium">
            <Link to="/strategy/qdii-premium">QDII Premium</Link>
            <p>QDII Premium</p>
          </Card>
        </Col>
      </Row>
      <Divider orientation="left">Tutorial</Divider>
      <Row>
        <Col span="6">
          <Card title="美股">
            <Link to="/tutorial/stock-us">美股</Link>
            <p>美股相关教程</p>
          </Card>
        </Col>
        <Col span="6" offset="2">
          <Card title="期权">
            <Link to="/tutorial/stock-us">美股</Link>
            <p>期权相关教程</p>
          </Card>
        </Col>
        <Col span="6" offset="2">
          <Card title="宏观经济学">
            <Link to="/tutorial/stock-us">宏观经济学</Link>
            <p>宏观经济学</p>
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <PageContainer>
      <ReactMarkdown>{txt}</ReactMarkdown>
      {services}
    </PageContainer>
  );
};
