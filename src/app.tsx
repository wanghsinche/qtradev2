import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import { APIS } from '@/pages/profile/store';
import { CommentBTN, CommentDrawer } from '@/components/comment';

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
    rightContentRender: () => (
      <div>
        <a href={APIS.logout}>logout</a>
      </div>
    ),
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};
