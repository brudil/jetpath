import React from 'react';
import { LoadingComponentProps } from 'react-loadable';
import Loader from '../LoadingContent';

const Loading: React.FC<LoadingComponentProps> = (props) => {
  if (props.error) {
    return <div>Error!</div>;
  } else if (props.timedOut) {
    return <div>Taking a long time...</div>;
  } else if (props.pastDelay) {
    return <Loader />;
  }

  return null;
}

export default Loading;
