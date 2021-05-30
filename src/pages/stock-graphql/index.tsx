import * as React from 'react';
import { BasicLayoutProps, PageContainer } from '@ant-design/pro-layout';
import { APIS } from '@/pages/profile/store';
import { Spin } from 'antd';
export default (p: BasicLayoutProps) => {
  const [loading, setLoading] = React.useState(true);
  const nodeID = 'graphql-node';
  useUtterances(nodeID, () => setLoading(false));

  return (
    <Spin spinning={loading}>
      <div id={nodeID} style={{ minHeight: 300 }}>
        Loading GraphQL Playground
      </div>
    </Spin>
  );
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
        settings: {
          'editor.cursorShape': 'line', // possible values: 'line', 'block', 'underline'
          'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
          'editor.fontSize': 14,
          'editor.reuseHeaders': true, // new tab reuses headers from last tab
          'editor.theme': 'light', // possible values: 'dark', 'light'
          'general.betaUpdates': false,
          'prettier.printWidth': 80,
          'prettier.tabWidth': 2,
          'prettier.useTabs': false,
          'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
          'schema.polling.enable': true, // enables automatic schema polling
          'schema.polling.endpointFilter': '*localhost*', // endpoint filter for schema polling
          'schema.polling.interval': 2000, // schema polling interval in ms
          'schema.disableComments': true,
          'tracing.hideTracingResponse': true,
          'tracing.tracingSupported': false, // set false to remove x-apollo-tracing header from Schema fetch requests
        },
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
