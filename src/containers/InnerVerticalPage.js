import PropTypes from 'prop-types';
import React from 'react';
import findIndex from 'lodash/findIndex';
import { connect } from 'react-redux';
import { setVertical, getVerticals } from '../actions/VerticalActions';
import { Redirect, Route, Switch } from 'react-router-dom';

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
      nextProps.params.vertical !==
      this.props.verticals.selectedVerticalIdentifier
    ) {
      this.props.dispatch(setVertical(nextProps.params.vertical));
    }
  }

  render() {
    const selectedVertical = this.props.verticals.selectedVertical;

    if (!selectedVertical) {
      return (
        <h1>This vertical doesn't exist, or you don't have access to it.</h1>
      );
    }

    return (
      <Switch>
        <Route path="content" component={ContentListPage} />
        <Route path="media" component={MediaListPage} />
        <Route path="organisation" component={OrganisationPage} />
        <Redirect from="editor" to="editor/new" />
        <Route path="editor/:id" component={EditorPage}>
          <Route path="/" component={EditorSectionContent} exact />
          <Route path="metadata" component={EditorSectionMetadata} />
          <Route path="workflow" component={EditorSectionWorkflow} />
        </Route>
      </Switch>
    );
  }
}

InnerVerticalPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(state => ({
  verticals: state.verticals,
}))(InnerVerticalPage);
