import React from 'react';
import Element from '../Element';
import ElementStream from '../ElementStream';

import styles from './SectionItem.css';
import {ChangesetApplier, ElementPath} from "../../../libs/spectrum2/interfaces";
import {SpectrumRenderElement} from "../interfaces";

interface IProps {
  index: number,
  path: ElementPath,
  data: any,
  update: ChangesetApplier,
  focus: any
}

const ListSectionItem: SpectrumRenderElement<IProps> = (props: IProps) => {
  const { data, path, update, index, focus } = props;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        List Item #{index + 1}
      </header>
      <Element data={data} update={update} path={path} index="title" isInStream={false} focus={focus} />
      <ElementStream data={data} update={update} path={path} index="stream" focus={focus} />
    </div>
  );
}

export default ListSectionItem;
