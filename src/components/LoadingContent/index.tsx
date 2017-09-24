import React from 'react';

import contentStyles from './LoadingContent.css';

function LoadingContent() {
  return (
    <div className={contentStyles.root}>
      <span className={contentStyles.message}>Loading</span>
    </div>
  );
}

export default LoadingContent;
