import React from 'react';
import DocumentTitle from '../components/DocumentTitle';
import ViewContainer from '../components/ViewContainer';
import { compose, lifecycle } from 'recompose';
import { graphql }from "react-apollo";
import differenceInDays from 'date-fns/differenceInDays';

import DashboardQuery from './Dashboard.graphql';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ContentCard from '../components/ContentCard/index';

interface PageProps {
  vertical: {
    identifier: string,
  }
}

interface Content {
  contentId: number,
  editorialMetadata: {
    currentRevision: {
      headline: string
    }
  }
}

interface IProps {
  auth: any,
  vertical: {
    identifier: string,
  }
  data: {
    loading: boolean,
    error: boolean,
    vertical: {
      contentStats: {
        totalDrafts: number,
        totalFinal: number,
        totalStubs: number,
      },
      lastPublished: {
        publishedDate: string,
      }
      recent: {
        edges: Array<{ node: Content }>
      }
    },
    refetch: () => void
  }
}

// eslint-disable-next-line react/prefer-stateless-function
class DashboardPage extends React.Component<IProps, {}> {
  render() {
    if (this.props.data.loading) {
      return <h1>Loading</h1>
    }

    if (this.props.data.error) {
      return <h1>error</h1>
    }
    const { vertical } = this.props;
    const recentEdges = this.props.data.vertical.recent.edges;
    const { lastPublished, contentStats } = this.props.data.vertical;
    const { totalDrafts, totalFinal, totalStubs } = contentStats;

    return (
      <DocumentTitle title="Dashboard">
        <ViewContainer>
        <div>
          <h1>Hey, {this.props.auth.getIn(['auth', 'username'])}!</h1>
          <div>
            <ul>
              {lastPublished ? <li>{differenceInDays(new Date(), new Date(lastPublished.publishedDate))} days since last publish</li> : <li>Go publish something!</li>}
              <li>{totalFinal} ready</li>
              <li>{totalStubs} stubs</li>
              <li>{totalDrafts} drafting</li>
            </ul>
          </div>
          <div>
            <h2>Pick up where you left off or <Link
              to={`/@${vertical.identifier}/editor/new`}
              className="Button"
            >Start new</Link></h2>
          </div>
          <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
            {recentEdges.map((edge: { node: Content }) => <ContentCard key={edge.node.contentId} headline={edge.node.editorialMetadata.currentRevision.headline} link={`/@${vertical.identifier}/editor/${edge.node.contentId}`} />)}
          </ul>
        </div>
        </ViewContainer>
      </DocumentTitle>
    );
  }
}

export default compose(
  connect(state => ({
    vertical: state.verticals.selectedVertical,
    auth: state.auth,
  })),
  graphql(DashboardQuery, {
    options: (props: PageProps) => ({
      variables: {
        vertical: props.vertical.identifier,
      },
    }),
  }),
  lifecycle<IProps, any>({
    componentDidMount() {
      this.props.data.refetch()
    }
  })
)(DashboardPage);

