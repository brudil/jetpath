import React from 'react';

import styles from './Overlay.css';

class Overlay extends React.Component<any, any> {
  private overlayElement: HTMLDivElement | null;

  handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === this.overlayElement) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <div
        className={styles.root_active}
        onClick={this.handleOverlayClick.bind(this)}
        ref={overlayElement => {
          this.overlayElement = overlayElement;
        }}
      />
    );
  }
}

export default Overlay;
