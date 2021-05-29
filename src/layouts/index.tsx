import * as React from 'react';
import { Button } from 'antd';
import ProLayout, { BasicLayoutProps } from '@ant-design/pro-layout';
import { APIS } from '@/pages/profile/store';
export default (p:React.PropsWithChildren<BasicLayoutProps>) => {
    return <ProLayout headerRender={()=><div><a href={APIS.logout}>logout</a></div>}>
        {p.children}
    </ProLayout>
};
