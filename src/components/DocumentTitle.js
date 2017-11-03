import PropTypes from 'prop-types';
import React from 'react';
import ReactDocumentTitle from 'react-document-title';

function DocumentTitle({ title, children }) {
  let appendedTitle;
  if (!title) {
    appendedTitle = 'Jetpath';
  } else {
    appendedTitle = `${title} - Jetpath`;
  }

  return (
    <ReactDocumentTitle title={appendedTitle}>{children}</ReactDocumentTitle>
  );
}

DocumentTitle.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default DocumentTitle;
