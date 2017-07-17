import React from 'react';

import saveToSaveIcon from './cloud-upload.svg';
import style from './SaveBeforeWorkflowMessage.css';

function SaveBeforeWorkflowMessage(props) {
  return (
    <div className={style.root}>
      <img className={style.image} src={saveToSaveIcon} role="presentation" />
      <div className={style.message}>
        Sync to the cloud to access workflow management
      </div>
    </div>
  );
}

SaveBeforeWorkflowMessage.propTypes = {};

export default SaveBeforeWorkflowMessage;
