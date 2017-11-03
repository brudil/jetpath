import React from 'react';
import omit from 'lodash/omit';

interface IProps {
  hash: string;
  size: number;
}

function DumbGravatar(props: IProps) {
  return (
    <img
      {...omit(props, ['hash', 'size'])}
      src={`https://www.gravatar.com/avatar/${props.hash}?d=retro`}
      role="presentation"
    />
  );
}

export default DumbGravatar as any; // todo: ts jsx spread
