import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { MyMenu } from '@/components/menu';
import { CommentBTN, CommentDrawer } from '@/components/comment';
import { Head } from '@/pages/profile';
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    ...initialState?.settings,
    footerRender: () => (
      <div>
        <CommentBTN />
        <CommentDrawer />
      </div>
    ),
    rightContentRender: () => <Head />,
    menuHeaderRender: undefined,
    siderWidth: 200,
    theme: 'light',
    navTheme: 'light',
  };
};
