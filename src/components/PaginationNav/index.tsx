import React from 'react';
import Button from '../Button';
import { css } from 'emotion';

const rootStyles = css`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const buttonContainerStyles = css`
  flex: 1 0 0px;
`;

const currentPageStyles = css`
  padding-left: 2rem;
  padding-right: 2rem;
  text-transform: uppercase;
  font-weight: bold;
  min-width: 80px;
  text-align: center;
  color: var(--color__optional-gray);
  flex: 2 0 0px;
`;

interface IProps {
  currentPage: number;
  hasNext: boolean;
  total: number;
  onChange: (page: number) => void;
}

export function PaginationNav(props: IProps) {
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
    <div className={rootStyles}>
      <div className={buttonContainerStyles}>
        {currentPage > 1 ? renderPrevious() : null}
      </div>
      <div className={currentPageStyles}>
        Page {currentPage}
        {total ? ` of ~${total}` : null}
      </div>
      <div className={buttonContainerStyles}>
        {hasNext ? renderNext() : null}
      </div>
    </div>
  );
}

export default PaginationNav;
