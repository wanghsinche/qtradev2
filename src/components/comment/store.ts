import * as React from 'react';
import { createModel } from 'hox';

function commentModel() {
  const [show, setShow] = React.useState(true);
  return {
    show,
    setShow,
  };
}

export default createModel(commentModel);
