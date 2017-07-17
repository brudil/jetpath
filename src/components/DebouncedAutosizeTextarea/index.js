import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function DebouncedAutosizeTextarea(props) {
  // Fix for the current DebounceInput bug
  // <DebounceInput element={TextareaAutosize} {...props} debounceTimeout={300} />
  return <TextareaAutosize {...props} />;
}

export default DebouncedAutosizeTextarea;
