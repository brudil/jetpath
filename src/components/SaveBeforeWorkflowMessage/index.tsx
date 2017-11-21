import React from 'react';

import saveToSaveIcon from './cloud-upload.svg';
import { css } from 'emotion';

const imageStyles = css`
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 2rem auto;
`;

const messageStyles = css`
  text-align: center;
  font-size: 1.7rem;
`;

function SaveBeforeWorkflowMessage() {
  return (
    <div>
      <img className={imageStyles} src={saveToSaveIcon} role="presentation" />
      <div className={messageStyles}>
        Sync to the cloud to access workflow management
      </div>
    </div>
  );
}

export default SaveBeforeWorkflowMessage;
