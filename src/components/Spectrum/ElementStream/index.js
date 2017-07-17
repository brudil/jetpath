import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { nameToElementMap } from '../elementsMap';
import ElementInserter from '../ElementInserter';
import Element from '../Element';
import * as SpectrumPropTypes from '../SpectrumPropTypes';

function ElementStream(props) {
  const { data, index, path, update, className } = props;

  const ElementFromMap = nameToElementMap.get(data.get('_name'));
  const structure = new ElementFromMap()._fields[index].itemField;

  return (
    <ul className={cx(className, 'spectrum-stream')}>
      {data.get(index).map((item, itemIndex) => {
        const position = [itemIndex, data.get(index).size];
        return (
          <li key={item.get('_id')}>
            <ElementInserter
              filter={{ type: 'section' }}
              structure={structure}
              update={update}
              path={[...path, index]}
              position={itemIndex}
            />
            <Element
              data={data.get(index)}
              update={update}
              path={[...path, index]}
              index={itemIndex}
              position={position}
              isInStream
            />
          </li>
        );
      })}
      <li>
        <ElementInserter
          filter={{ type: 'section' }}
          structure={structure}
          update={update}
          path={[...path, index]}
          position={data.get(index).size}
        />
      </li>
    </ul>
  );
}

ElementStream.propTypes = {
  update: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.shape({
      setupStructure: PropTypes.object,
    }).isRequired,
    PropTypes.array.isRequired,
  ]),
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  path: SpectrumPropTypes.elementPath.isRequired,
};

ElementStream.defaultProps = {
  index: 'stream',
};

export default ElementStream;
