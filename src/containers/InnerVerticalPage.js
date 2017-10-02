import React from 'react';
import { connect } from 'react-redux';
import loadEditorPage from 'bundle-loader?name=Editor&lazy!./EditorPage';
import loadOrganisationPage from 'bundle-loader?name=Organisation&lazy!./OrganisationPage';
import loadMediaListPage from 'bundle-loader?name=Media&lazy!./MediaListPage';
import loadDashboardPage from 'bundle-loader?name=Dashboard&lazy!./DashboardPage';
import loadMediaEditPage from 'bundle-loader?name=MediaEdit&lazy!./MediaEditPage';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { setVertical, getVerticals } from '../ducks/Vertical';
import ContentListPage from './ContentListPage';

import Bundle from '../components/Bundle';

const DashboardPage = props =>
  <Bundle load={loadDashboardPage}>
    {DashboardPageL => <DashboardPageL {...props} />}
  </Bundle>;

const EditorPage = props =>
  <Bundle load={loadEditorPage}>
    {EditorPageL => <EditorPageL {...props} />}
  </Bundle>;

const OrganisationPage = props =>
  <Bundle load={loadOrganisationPage}>
    {OrganisationPageL => <OrganisationPageL {...props} />}
  </Bundle>;

const MediaListPage = props =>
  <Bundle load={loadMediaListPage}>
    {MediaListPageL => <MediaListPageL {...props} />}
  </Bundle>;

const MediaEditPage = props =>
  <Bundle load={loadMediaEditPage}>
    {MediaEditPageL => <MediaEditPageL {...props} />}
  </Bundle>;

class InnerVerticalPage extends React.Component {
  componentDidMount() {
    this.handleVerticalCorrect(this.props);
    this.props.dispatch(getVerticals());
  }

  componentWillReceiveProps(nextProps) {
    this.handleVerticalCorrect(nextProps);
  }

  handleVerticalCorrect(nextProps = null) {
    if (
      nextProps.match.params.vertical !==
      this.props.verticals.selectedVerticalIdentifier
    ) {
      this.props.dispatch(setVertical(nextProps.match.params.vertical));
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
        <Route path={`${url}/dashboard`} component={DashboardPage} />
        <Route path={`${url}/content`} component={ContentListPage} />
        <Route path={`${url}/media`} exact component={MediaListPage} />
        <Route path={`${url}/media/:id`} component={MediaEditPage} />
        <Route path={`${url}/organisation`} component={OrganisationPage} />
        <Route path={`${url}/editor/:id`} component={EditorPage} />
        <Redirect from={`${url}/editor`} to="editor/new" />
      </Switch>
    );
  }
}

InnerVerticalPage.propTypes = {};

export default withRouter(
  connect(state => ({
    verticals: state.verticals,
  }))(InnerVerticalPage)
);
