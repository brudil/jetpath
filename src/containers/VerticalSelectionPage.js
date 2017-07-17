import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import sample from 'lodash/sample';
import classnames from 'classnames';
import DocumentTitle from '../components/DocumentTitle';
import loginButtonOptions from '../lang/login';
import * as VerticalActions from '../actions/VerticalActions';
import Button from '../components/Button';

class VerticalSelectionPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(VerticalActions.getVerticals());
  }

  render() {
    const verticals = this.props.verticals;
    return (
      <DocumentTitle title="Select a vertical">
        <div>
          <h1>Verticals!</h1>
          <ul>
            {verticals.map(vertical =>
              <li key={vertical.identifier}>
                <Link to={`/@${vertical.identifier}/content`}>
                  {vertical.name}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </DocumentTitle>
    );
  }
}

VerticalSelectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  nextLocation: PropTypes.string.isRequired,
};

export default connect(state => ({
  auth: state.auth,
  nextLocation: state.routing.locationBeforeTransitions.query.nextPath || '/',
  verticals: state.verticals.list,
}))(VerticalSelectionPage);
