import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from '../../components/DocumentTitle';
import * as VerticalActions from '../../ducks/Vertical';
import verticalConfig from '../../verticals';

import style from './style.css';

class VerticalSelectionPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(VerticalActions.getVerticals());
  }

  render() {
    const verticals = this.props.verticals;
    return (
      <DocumentTitle title="Select a vertical">
        <div>
          <h1 className={style.title}>Select a vertical</h1>
          <ul className={style.list}>
            {verticals.map(vertical =>
              <li key={vertical.identifier}>
                <Link
                  className={style.item}
                  to={`/@${vertical.identifier}/content`}
                >
                  <img
                    className={style.logo}
                    src={verticalConfig[vertical.identifier].logoHeader}
                    alt={vertical.name}
                  />
                  <span className={style.audience}>
                    {vertical.audience}
                  </span>
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
