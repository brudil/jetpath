import React from 'react';
import MediaGridItem, { MediaObject } from './MediaGridItem';

interface IProps {
  media: Array<{ node: MediaObject; id: string }>;
  onSelect?: (mediaId: number) => void;
  wrap?: (media: MediaObject, children: JSX.Element) => Element;
}

function MediaGrid(props: IProps) {
  return (
    <ul>
      {props.media.map(media => (
        <MediaGridItem
          media={media.node}
          key={media.node.mediaId}
          onSelect={props.onSelect}
          match={undefined}
          wrap={props.wrap}
        />
      ))}
    </ul>
  );
}

export default MediaGrid;
