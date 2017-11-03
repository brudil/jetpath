import PropTypes from 'prop-types';
import React from 'react';
import { createSelector } from 'reselect';
import cx from 'classnames';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import * as ModalManagerActions from '../../ducks/Modal';

import stylesOverlay from './Overlay.css';
import stylesModal from './Modal.css';

const modalVisible = createSelector(
  (_, props) => props.uuid,
  state => state.modalManager,
  (uuid, modalManager) => ({
    isVisible: modalManager.modals[uuid] || false,
    conf: modalManager.modalsConf[uuid] || {},
  })
);

class Modal extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible === false && this.props.isVisible !== false) {
      Mousetrap.unbind('esc');
      document.body.style.overflow = '';
    }

    if (
      nextProps.isVisible === true &&
      nextProps.isVisible !== this.props.isVisible
    ) {
      Mousetrap.bind('esc', this.handleClose.bind(this));
      document.body.style.overflow = 'hidden';
    }
  }

  handleOverlayClick(event) {
    if (event.target === this._overlay) {
      this.handleClose();
    }
  }

  handleClose() {
    this.props.dispatch(ModalManagerActions.closeById(this.props.uuid));
  }

  render() {
    const InnerModal = this.props.innerModal;

    const modal = () => (
      <div className={cx(stylesModal.root, stylesOverlay.front)}>
        <InnerModal
          {...this.props.innerProps}
          close={this.handleClose.bind(this)}
          conf={this.props.conf}
        />
      </div>
    );

    const overlay = (
      <div
        className={stylesOverlay.back}
        onClick={this.handleOverlayClick.bind(this)}
        ref={overlayElement => {
          this._overlay = overlayElement;
        }}
      />
    );
    return (
      <div
        className={cx(stylesOverlay.root, {
          [stylesOverlay.root_active]: this.props.isVisible,
        })}
      >
        {this.props.isVisible ? overlay : null}
        {this.props.isVisible ? modal() : null}
      </div>
    );
  }
}

Modal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  uuid: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  conf: PropTypes.object.isRequired,
  innerProps: PropTypes.object.isRequired,
  innerModal: PropTypes.any.isRequired,
};

export default connect(modalVisible)(Modal);
