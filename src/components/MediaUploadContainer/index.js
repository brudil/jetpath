import PropTypes from 'prop-types';
import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget as dropTarget } from 'react-dnd';
import cx from 'classnames';

import styles from './MediaUpload.css';

const fileTarget = {
  drop(props, monitor, component) {
    component.handleFileUpload(monitor.getItem().files);
  },
};

class MediaUploadContainer extends React.Component {
  handleFileUpload(files) {
    files.forEach(file => this.props.onFile(file));
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    const classes = cx(styles.root, {
      [styles.isOver]: isOver && canDrop,
    });

    return connectDropTarget(
      <div>
        {this.props.children}
        <div className={classes}>
          <div className={styles.text}>Drop to upload</div>
        </div>
      </div>
    );
  }
}

MediaUploadContainer.propTypes = {
  children: PropTypes.element.isRequired,
  onFile: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
};

export default dropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(MediaUploadContainer);