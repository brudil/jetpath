import React from "react";
import ReactModal from 'react-modal';

import stylesOverlay from './Overlay.css';
import stylesModal from './Modal.css';

export default function Modal(props: ReactModal.Props) {
  return <ReactModal className={stylesModal.root} overlayClassName={stylesOverlay.root_active} {...props} />
}
