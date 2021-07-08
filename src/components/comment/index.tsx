import * as React from 'react';
import { Button, Drawer, Spin } from 'antd';
import commentModel from './store';
import './style.less';
export const CommentBTN = () => {
  const store = commentModel();
  const onClick = React.useCallback(() => {
    if (store.show) {
      store.setShow(false);
    } else {
      store.setShow(true);
    }
  }, [store.show]);
  return (
    <Button onClick={onClick} className="comment-btn" type="primary">
      Comments
    </Button>
  );
};

export const CommentDrawer = () => {
  const store = commentModel();
  const commentNodeId = 'comment-node';
  useUtterances(commentNodeId, () => store.setShow(false));
  return (
    <Drawer
      visible={store.show}
      onClose={() => store.setShow(false)}
      width="400"
    >
      {!store.show && <Spin spinning={true} />}
      <div id={commentNodeId} />
    </Drawer>
  );
};

export const useUtterances = (
  commentNodeId: string,
  onload: () => void = () => void 0,
) => {
  React.useEffect(() => {
    const scriptParentNode = document.getElementById(commentNodeId);
    if (!scriptParentNode) return;
    // docs - https://utteranc.es/
    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'wanghsinche/qtradev2');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment :speech_balloon:');
    script.setAttribute('theme', 'github-light');
    script.setAttribute('crossorigin', 'anonymous');
    script.onload = onload;

    scriptParentNode.appendChild(script);

    return () => {
      // cleanup - remove the older script with previous theme
      scriptParentNode.firstChild &&
        scriptParentNode.removeChild(scriptParentNode.firstChild);
    };
  }, [commentNodeId]);
};
