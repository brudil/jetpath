import React from 'react';
import MediaGridItem  from './MediaGridItem';
import {MediaObject} from "../../types";

interface IProps {
  media: Array<{ node: MediaObject; id: string }>;
  onSelect?: (mediaId: number) => void;
  wrap?: (media: MediaObject, children: JSX.Element) => Element;
}

const MediaGrid: React.FC<IProps> = (props) => {
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
