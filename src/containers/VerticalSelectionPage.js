import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from '../components/DocumentTitle';
import * as VerticalActions from '../ducks/Vertical';
import verticalConfig from '../verticals';

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
                  <img
                    src={verticalConfig[vertical.identifier].logoHeader}
                    alt={vertical.name}
                  />
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
};

export default connect(state => ({
  auth: state.auth,
  verticals: state.verticals.list,
}))(VerticalSelectionPage);
