import React from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
import {
  DropTarget as dropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
} from 'react-dnd';
import cx from 'classnames';
import styled from '@emotion/styled';
import { css } from 'emotion';

interface ComponentProps {}

interface InternalProps {
  children: any;
  onFile: any; // todo
  isOver: boolean;
  canDrop: boolean;
  connectDropTarget: ConnectDropTarget;
}

type IProps = InternalProps & ComponentProps;

const BigText = styled.div`
  text-align: center;
  margin-top: 35vh;
  font-size: 3.5rem;
  color: rgb(60, 60, 60);
`;

const rootStyles = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(240, 240, 240, 0.85);
  display: none;
  opacity: 0;
`;

const isOverStyles = css`
  display: block;
  opacity: 1;
  z-index: 100;
`;

const fileTarget = {
  drop(
    _props: IProps,
    monitor: DropTargetMonitor,
    component: MediaUploadContainer
  ) {
    component.handleFileUpload((monitor.getItem() as any).files); // todo
  },
};

class MediaUploadContainer extends React.Component<IProps> {
  handleFileUpload(files: File[]) {
    files.forEach(file => this.props.onFile(file));
  }

  render() {
    const { connectDropTarget, isOver, canDrop } = this.props;
    const classes = cx(rootStyles, {
      [isOverStyles]: isOver && canDrop,
    });

    return connectDropTarget(
      <div>
        {this.props.children}
        <div className={classes}>
          <BigText>Drop to upload</BigText>
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
