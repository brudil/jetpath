import React from 'react';

import SaveToSaveIcon from './cloud-upload.svg';
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

const SaveBeforeWorkflowMessage: React.FC = () => {
  return (
    <div>
      <SaveToSaveIcon className={imageStyles} role="presentation" />
      <div className={messageStyles}>
        Sync to the cloud to access workflow management
      </div>
    </div>
  );
}

export default SaveBeforeWorkflowMessage;
