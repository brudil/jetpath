import PropTypes from 'prop-types';
import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { StickyContainer } from 'react-sticky';
import GlobalHeader from '../../components/GlobalHeader';
import Toasts from '../../components/Toasts';

import styles from './BaseContainer.css';
import { Redirect, Route, Switch } from 'react-router-dom';
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
      this.props.dispatch(
        replace({
          pathname: '/auth/login',
          query: {
            nextPath: this.props.location.pathname,
          },
        })
      );
    }
  }

  render() {
    const vertical = this.props.params.vertical;
    return (
      <div>
        <StickyContainer>
          <GlobalHeader />
          <div className={styles.rootSectionWrapper}>
            <div className={styles.rootSection}>
              <Switch>
                <Route path="verticals" component={VerticalSelectionPage} />
                <Route path="@:vertical" component={InnerVerticalPage} />
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

export default dragDropContext(HTML5Backend)(
  connect(state => ({
    auth: state.auth,
    verticals: state.verticals,
  }))(BaseContainer)
);
