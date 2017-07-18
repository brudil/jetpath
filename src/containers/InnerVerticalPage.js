import React from 'react';
import { connect } from 'react-redux';
import loadEditorPage from 'bundle-loader?name=Editor&lazy!./EditorPage';
import loadOrganisationPage from 'bundle-loader?name=Organisation&lazy!./OrganisationPage';
import loadMediaListPage from 'bundle-loader?name=Media&lazy!./MediaListPage';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { setVertical, getVerticals } from '../actions/VerticalActions';
import ContentListPage from './ContentListPage';

import Bundle from '../components/Bundle';

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
    const selectedVertical = this.props.verticals.selectedVertical;
    const { url } = this.props.match;

    if (!selectedVertical) {
      return (
        <h1>
          {"This vertical doesn't exist, or you don't have access to it."}
        </h1>
      );
    }

    return (
      <Switch>
        <Route path={`${url}/content`} component={ContentListPage} />
        <Route path={`${url}/media`} component={MediaListPage} />
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
