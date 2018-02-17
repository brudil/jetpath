import React from 'react';
import cx from 'classnames';
import { getElementByName } from '../../../libs/spectrum2/structure';
import ElementInserter from '../ElementInserter';
import Element from '../Element';
import {
  ChangesetApplier,
  ElementIndex,
  ElementPath,
} from '../../../libs/spectrum2/interfaces';

interface IProps {
  update: ChangesetApplier;
  data: any;
  index: ElementIndex;
  className?: string;
  path: ElementPath;
  focus: any;
}

const ElementStream: React.SFC<IProps> = (props: IProps) => {
  const { data, index, path, update, className, focus } = props;

  const def = getElementByName(data.get('_name'));

  if (!def) {
    return <div>error. check console.</div>
  }

  const structure = def.fields[index];

  return (
    <ul className={cx(className, 'spectrum-stream')}>
      {data.get(index).map((item: any, itemIndex: number) => {
        const position = [itemIndex, data.get(index).size];
        return (
          <li key={item.get('_id')}>
            <ElementInserter
              structure={structure}
              update={update}
              path={[...path, index]}
              position={itemIndex}
              focus={focus}
            />
            <Element
              data={data.get(index)}
              update={update}
              path={[...path, index]}
              index={itemIndex}
              position={position}
              focus={focus}
              isInStream
            />
          </li>
        );
      })}
      <li>
        <ElementInserter
          structure={structure}
          update={update}
          path={[...path, index]}
          position={data.get(index).size}
          focus={focus}
        />
      </li>
    </ul>
  );
};

ElementStream.defaultProps = {
  index: 'stream',
};

export default ElementStream;
