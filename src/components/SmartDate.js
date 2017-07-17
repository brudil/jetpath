import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

const weekAgoMonent = moment().subtract(5, 'days');

function SmartDate(props) {
  const dateMonent = moment(props.value);
  const shouldPrintPretty = dateMonent.diff(weekAgoMonent, 'days') > 0;
  const textualValue = shouldPrintPretty
    ? dateMonent.fromNow()
    : `on ${dateMonent.format('ddd Do MMMM [at] hh:mma')}`;

  return (
    <span>
      <time
        dateTime={dateMonent.toISOString()}
        title={dateMonent.toISOString()}
      >
        {textualValue}
      </time>
    </span>
  );
}

SmartDate.propTypes = {
  value: PropTypes.string.isRequired,
};

export default SmartDate;
