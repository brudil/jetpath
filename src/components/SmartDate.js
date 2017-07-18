import PropTypes from 'prop-types';
import React from 'react';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import formatDistance from 'date-fns/formatDistance';

function SmartDate(props) {
  const date = new Date(props.value);
  const shouldPrintPretty = differenceInDays(date, new Date()) < 6;
  const textualValue = shouldPrintPretty
    ? formatDistance(date, new Date())
    : `on ${format(date, 'ddd Do MMMM [at] hh:mma')}`;

  return (
    <span>
      <time dateTime={date.toISOString()} title={date.toISOString()}>
        {textualValue}
      </time>
    </span>
  );
}

SmartDate.propTypes = {
  value: PropTypes.string.isRequired,
};

export default SmartDate;
