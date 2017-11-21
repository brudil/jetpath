import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import * as VerticalActions from '../ducks/Vertical';
import LoadableLoading from '../components/LoadableLoading';
import ContentListPage from './ContentListPage';
import { match } from 'react-router-dom';
import { compose } from 'redux';
import { RootState } from '../types';

const LoadableDashboardPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'DashboardPage' */ './DashboardPage') as any,
  loading: LoadableLoading,
});

const LoadableEditorPage = Loadable({
  loader: () => import(/* webpackChunkName: 'EditorPage' */ './EditorPage'),
  loading: LoadableLoading,
});

const LoadableOrganisationPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'OrganisationPage' */ './OrganisationPage'),
  loading: LoadableLoading,
});

const LoadableMediaListPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'MediaListPage' */ './MediaListPage'),
  loading: LoadableLoading,
});

const LoadableMediaEditPage = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'MediaEditPage' */ './MediaEditPage'),
  loading: LoadableLoading,
});

interface IParams {
  vertical: string;
}

interface IProps {
  match: match<IParams>;
  getVerticals(): void;
  setVertical(vertical: string): void;
  verticals: {
    selectedVerticalIdentifier: string;
    selectedVertical: {
      identifier: string;
    };
    isLoading: boolean;
  };
}

class InnerVerticalPage extends React.Component<IProps> {
  componentDidMount() {
    this.handleVerticalCorrect(this.props);
    this.props.getVerticals();
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.handleVerticalCorrect(nextProps);
  }

  handleVerticalCorrect(nextProps: IProps) {
    if (
      nextProps.match.params.vertical !==
      this.props.verticals.selectedVerticalIdentifier
    ) {
      this.props.setVertical(nextProps.match.params.vertical);
    }
  }

  render() {
    const { selectedVertical, isLoading } = this.props.verticals;
    const { url } = this.props.match;

    if (!selectedVertical) {
      if (isLoading) {
        return null;
      }

      return (
        <h1>
          {"This vertical doesn't exist, or you don't have access to it."}
        </h1>
      );
    }

    if (selectedVertical.identifier !== this.props.match.params.vertical) {
      return <h1>Loading</h1>;
    }

    return (
      <Switch>
        <Route path={`${url}/dashboard`} component={LoadableDashboardPage} />
        <Route path={`${url}/content`} component={ContentListPage} />
        <Route path={`${url}/media`} exact component={LoadableMediaListPage} />
        <Route path={`${url}/media/:id`} component={LoadableMediaEditPage} />
        <Route
          path={`${url}/organisation`}
          component={LoadableOrganisationPage}
        />
        <Route path={`${url}/editor/:id`} component={LoadableEditorPage} />
        <Redirect from={`${url}/editor`} to="editor/new" />
      </Switch>
    );
  }
}

export default compose(
  withRouter,
  connect(
    (state: RootState) => ({
      verticals: state.verticals,
    }),
    {
      setVertical: VerticalActions.setVertical,
      getVerticals: VerticalActions.getVerticals,
    }
  )
)(InnerVerticalPage);
