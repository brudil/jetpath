import PropTypes from 'prop-types';
import React from 'react';
import * as SpectrumPropTypes from '../SpectrumPropTypes';
import ElementStream from '../ElementStream';

function ArticleSubtype(props) {
  const { data, path, update } = props;
  return (
    <ElementStream
      className="spectrum__top-stream"
      data={data}
      index="stream"
      path={path}
      update={update}
    />
  );
}

ArticleSubtype.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default ArticleSubtype;
