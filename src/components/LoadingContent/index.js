import React from 'react';

import contentStyles from './LoadingContent.css';
import pS from './LoadingPattern.css';

function LoadingContent() {
  return (
    <div className={contentStyles.root}>
      <div className={contentStyles.spinner}>
        <svg viewBox="0 0 100 100" x="0px" y="0px">
          <path
            className={pS.tiny}
            d="m 23.635918,79.455348 0,15.544652 34.136408,0 0,-15.544652 z"
            strokeWidth="1.6"
          />
          <path
            className={pS.tiny}
            d="m 5,23.635918 0,34.136408 15.544652,0 0,-34.136408 z"
            strokeWidth="1.6"
          />
          <path
            className={pS.large}
            d="m 5,60.863592 0,15.50049 52.772326,0 0,-15.50049 z"
            strokeWidth="1.6"
          />
          <path
            className={pS.large}
            d="m 23.635918,5 0,52.772326 15.50049,0 0,-52.772326 z"
            strokeWidth="1.6"
          />
          <path
            className={pS.tiny}
            d="m 42.227674,5 0,15.544652 34.136408,0 0,-15.544652 z"
            strokeWidth="1.6"
          />
          <path
            className={pS.center}
            d="m 42.244909,57.754834 0,-15.510185 15.510185,0 0,15.510185 z"
            strokeWidth="1.6"
          />
          <path
            className={pS.large}
            d="m 42.227674,23.635918 0,15.50049 52.772326,0 0,-15.50049 z"
            strokeWidth="1.6"
          />
          <path
            className={pS.large}
            d="m 60.863592,42.227674 0,52.772326 15.50049,0 0,-52.772326 z"
            strokeWidth="1.6"
          />
          <path
            className={pS.tiny}
            d="m 79.455348,42.227674 0,34.136408 15.544652,0 0,-34.136408 z"
            strokeWidth="1.6"
          />
        </svg>
      </div>
      <span className={contentStyles.message}>Loading</span>
    </div>
  );
}

LoadingContent.propTypes = {};

export default LoadingContent;
