import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';

import styles from './PaginationNav.css';

function PaginationNav(props) {
  const { hasNext, currentPage, onChange, total } = props;

  function handlePreviousPage() {
    onChange(parseInt(currentPage, 10) - 1);
  }

  function handleNextPage() {
    onChange(parseInt(currentPage, 10) + 1);
  }

  function renderPrevious() {
    return <Button onClick={handlePreviousPage} text="Previous" />;
  }

  function renderNext() {
    return <Button onClick={handleNextPage} text="Next" />;
  }

  return (
    <div className={styles.root}>
      <div className={styles.button}>
        {currentPage > 1 ? renderPrevious() : null}
      </div>
      <div className={styles.currentPage}>
        Page {currentPage}
        {total ? ` of ~${total}` : null}
      </div>
      <div className={styles.button}>
        {hasNext ? renderNext() : null}
      </div>
    </div>
  );
}

PaginationNav.propTypes = {
  currentPage: PropTypes.number.isRequired,
  hasNext: PropTypes.bool.isRequired,
  total: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default PaginationNav;
