import PropTypes from 'prop-types';
import React from 'react';
import findIndex from 'lodash/findIndex';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { setVertical, getVerticals } from '../actions/VerticalActions';
import ContentListPage from './ContentListPage';
import MediaListPage from './MediaListPage';
import OrganisationPage from './OrganisationPage';
import EditorPage from './EditorPage';

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
        <Redirect from={`${url}/editor`} to="editor/new" />
        <Route path={`${url}/editor/:id`} component={EditorPage} />
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
