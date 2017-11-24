import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import { DropTarget as dropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd';
import cx from 'classnames';

import styles from './MediaUpload.css';

interface ComponentProps {

}

interface InternalProps {
  children: any;
  onFile: any; // todo
  isOver: boolean;
  canDrop: boolean;
  connectDropTarget: ConnectDropTarget,
}

type IProps = InternalProps & ComponentProps;

const fileTarget = {
  drop(_props: IProps, monitor: DropTargetMonitor, component: MediaUploadContainer) {
    component.handleFileUpload((monitor.getItem() as any).files); // todo
  },
};

class MediaUploadContainer extends React.Component<IProps> {
  handleFileUpload(files: File[]) {
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

export default dropTarget(NativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(MediaUploadContainer) as any; // todo
