import PropTypes from 'prop-types';
import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';
import GlobalHeader from '../../components/GlobalHeader';
import Toasts from '../../components/Toasts';

import styles from './BaseContainer.css';
import VerticalSelectionPage from '../VerticalSelectionPage';
import InnerVerticalPage from '../InnerVerticalPage';
import NotFoundPage from '../NotFoundPage';

class BaseContainer extends React.Component {
  componentWillMount() {
    if (!{}.hasOwnProperty.call(this.props, 'auth')) {
      return;
    }

    this.handleCorrectRoute(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.handleCorrectRoute(nextProps);
  }

  handleCorrectRoute(props) {
    if (props.auth.auth === null) {
      this.props.history.replace(
        `/auth/login?nextPath=${this.props.location.pathname}`
      );
    }
  }

  render() {
    const vertical = this.props.match.params.vertical;
    const { url } = this.props.match;
    return (
      <div>
        <StickyContainer>
          <GlobalHeader />
          <div className={styles.rootSectionWrapper}>
            <div className={styles.rootSection}>
              <Switch>
                <Route
                  path={`${url}verticals`}
                  component={VerticalSelectionPage}
                />
                <Route
                  path={`${url}@:vertical`}
                  component={InnerVerticalPage}
                />
                <Redirect from="/" to="verticals" />
                <Route path="*" component={NotFoundPage} />
              </Switch>
              <Toasts />
            </div>
          </div>
        </StickyContainer>
      </div>
    );
  }
}

BaseContainer.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

const withRoutered = withRouter(
  connect(state => ({
    auth: state.auth,
    verticals: state.verticals,
  }))(BaseContainer)
);

export default dragDropContext(HTML5Backend)(withRoutered);
