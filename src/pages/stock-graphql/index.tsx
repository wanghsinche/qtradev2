import * as React from 'react';
import { BasicLayoutProps, PageContainer } from '@ant-design/pro-layout';
import { APIS } from '@/pages/profile/store';
export default (p: BasicLayoutProps) => {
  const nodeID = 'graphql-node';
  useUtterances(nodeID);

  return <div id={nodeID} />;
};

const useUtterances = (nodeID: string, onload: () => void = () => void 0) => {
  React.useEffect(() => {
    const scriptParentNode = document.getElementById(nodeID);
    if (!scriptParentNode) return;
    const script = document.createElement('script');
    script.src =
      '//cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js';
    script.async = true;
    script.setAttribute('crossorigin', 'anonymous');
    script.onload = () => {
      window.GraphQLPlayground.init(document.getElementById(nodeID), {
        // options as 'endpoint' belong here
        endpoint: APIS.graphQL,
        'request.credentials': 'include',
        'editor.theme': 'light',
      });
      onload();
    };

    scriptParentNode.appendChild(script);

    return () => {
      // cleanup - remove the older script with previous theme
      scriptParentNode.firstChild &&
        scriptParentNode.removeChild(scriptParentNode.firstChild);
    };
  }, [nodeID]);
};
