import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { CommentBTN, CommentDrawer } from '@/components/comment';
import { Head } from '@/pages/profile';
export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings };
}): BasicLayoutProps => {
  return {
    footerRender: () => (
      <div>
        <CommentBTN />
        <CommentDrawer />
      </div>
    ),
    rightContentRender: () => <Head />,
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
