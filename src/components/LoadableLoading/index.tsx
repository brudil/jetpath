import React from 'react';
import { LoadingComponentProps } from 'react-loadable';
import Loader from '../LoadingContent';

function Loading(props: LoadingComponentProps) {
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
