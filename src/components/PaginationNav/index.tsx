import React from 'react';
import Button from '../Button';

import styles from './PaginationNav.css';

export function PaginationNav(props: {
  currentPage: number;
  hasNext: boolean;
  total: number;
  onChange: (page: number) => void;
}) {
  const { hasNext, currentPage, onChange, total } = props;

  function handlePreviousPage() {
    onChange(currentPage - 1);
  }

  function handleNextPage() {
    onChange(currentPage + 1);
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
      <div className={styles.button}>{hasNext ? renderNext() : null}</div>
    </div>
  );
}

export default PaginationNav;
