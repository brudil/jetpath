import React from 'react';
import Button from '../Button';
import { compose } from 'redux';
import { graphql } from 'react-apollo';

import ContentWatchersQuery from './ContentWatchers.graphql';
import WatchContentMutation from './WatchContent.graphql';
import { connect } from 'react-redux';

interface ContentWatcher {
  slient: boolean;
  user: {
    userId: number;
    username: string;
  };
}

interface ComponentProps {
  contentId: number;
}

interface InternalProps {
  auth: {
    id: number;
  };
  data: {
    loading: boolean;
    error: boolean;
    content: {
      editorialMetadata: {
        watchers: Array<ContentWatcher>;
      };
    };
  };
  watchContent: () => void;
  children?: Element;
}

type IProps = InternalProps & ComponentProps;

function ContentWatchManager(props: IProps) {
  if (props.data.loading) {
    return null;
  }
  if (props.data.error) {
    return <div>error!</div>;
  }

  const isWatching =
    props.data.content.editorialMetadata.watchers
      .map(watcher => watcher.user.userId)
      .indexOf(props.auth.id) >= 0;

  return (
    <div>
      <h3>Watchers</h3>
      <Button
        text={isWatching ? 'Slience' : 'Watch'}
        onClick={props.watchContent}
      />

      <ul>
        {props.data.content.editorialMetadata.watchers.map(watcher => (
          <li key={watcher.user.userId}>{watcher.user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default compose(
  connect((state: any) => ({
    auth: state.auth.get('auth'),
  })),
  graphql(WatchContentMutation, { name: 'watchContent' }),
  graphql(ContentWatchersQuery, {
    options: (props: IProps) => ({
      variables: {
        contentId: props.contentId,
      },
    }),
  })
)(ContentWatchManager) as React.SFC<ComponentProps>;
