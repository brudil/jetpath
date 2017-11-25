import React from 'react';
import ReactModal from 'react-modal';
import {css} from "emotion";

const rootModalStyles = css`
  margin: 1rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  background-color: var(--color__modal-background);
  transition: all 150ms 150ms ease;
  position: relative;
  top: 0;
  opacity: 1;
  transform: scale(1) translateY(0);
  flex: 1 1 auto;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const overlayStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  z-index: var(--layer__overlay);
  display: flex;
  background: rgba(0, 0, 0, 0.6);
`;


export default function Modal(props: ReactModal.Props) {
  return (
    <ReactModal
      className={rootModalStyles}
      overlayClassName={overlayStyles}
      {...props}
    />
  );
}
