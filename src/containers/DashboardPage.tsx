import React from 'react';
import DocumentTitle from '../components/DocumentTitle';
import ViewContainer from '../components/ViewContainer';
import { compose, lifecycle } from 'recompose';
import { graphql } from 'react-apollo';
import differenceInDays from 'date-fns/differenceInDays';
import DashboardQuery from './Dashboard.graphql';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ContentCard from '../components/ContentCard/index';
import BigStats from '../components/BigStats/index';
import Stat from '../components/BigStats/Stat';
import {startOfDay} from 'date-fns';

interface PageProps {
  vertical: {
    identifier: string;
  };
}

interface Content {
  contentId: number;
  editorialMetadata: {
    currentRevision: {
      headline: string;
      created: string;
      createdBy: {
        username: string;
      } | null;
    };
  };
}

interface IProps {
  auth: any;
  vertical: {
    identifier: string;
  };
  data: {
    loading: boolean;
    error: boolean;
    vertical: {
      contentStats: {
        totalDrafts: number;
        totalFinal: number;
        totalStubs: number;
      };
      lastPublished: {
        publishedDate: string;
      };
      recent: {
        edges: Array<{ node: Content }>;
      };
    };
    refetch: () => void;
  };
}

// eslint-disable-next-line react/prefer-stateless-function
class DashboardPage extends React.Component<IProps, {}> {
  renderContentCards() {
    const { vertical } = this.props;
    const recentEdges = this.props.data.vertical.recent.edges;

    return (
      <ul style={{ display: 'flex', flexWrap: 'wrap' }}>
        {recentEdges.map((edge: { node: Content }) => (
          <ContentCard
            key={edge.node.contentId}
            headline={edge.node.editorialMetadata.currentRevision.headline}
            link={`/@${vertical.identifier}/editor/${edge.node.contentId}`}
            currentRevision={edge.node.editorialMetadata.currentRevision}
          />
        ))}
      </ul>
    );
  }

  renderContent() {
    if (this.props.data.error) {
      return <h1>error</h1>;
    }

    const { vertical } = this.props;
    return (
      <div>
        <div>
          <BigStats
            data={
              this.props.data.loading
                ? null
                : [
                    this.props.data.vertical.lastPublished,
                    this.props.data.vertical.contentStats.totalStubs,
                    this.props.data.vertical.contentStats.totalDrafts,
                    this.props.data.vertical.contentStats.totalFinal,
                  ]
            }
          >
            <Stat
              subtitle="Days since publish"
              render={(loading, value) => {
                if (loading) {
                  return '0';
                }

                if (value === null) {
                  return 'n/a';
                }

                return differenceInDays(
                  startOfDay(new Date()),
                  startOfDay(new Date(value.publishedDate))
                );
              }}
            />
            <Stat subtitle="Ideas to kick off" />
            <Stat subtitle="Drafts to finish" />
            <Stat subtitle="Ready to publish" />
          </BigStats>
        </div>
        <div>
          <h2 style={{ marginBottom: '1rem', marginTop: '2rem' }}>
            Pick up where you left off or{' '}
            <Link to={`/@${vertical.identifier}/editor/new`} className="Button">
              Start new
            </Link>
          </h2>
        </div>
        {this.props.data.loading ? null : this.renderContentCards()}
      </div>
    );
  }

  render() {
    return (
      <DocumentTitle title="Dashboard">
        <ViewContainer>
          <h1 style={{ marginBottom: '1rem' }}>
            Hey, {this.props.auth.getIn(['auth', 'username'])}!
          </h1>
          {this.renderContent()}
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
      this.props.data.refetch();
    },
  })
)(DashboardPage);
