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
  update: ChangesetApplier
}

const ListSectionItem: SpectrumRenderElement<IProps> = (props: IProps) => {
  const { data, path, update, index } = props;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        List Item #{index + 1}
      </header>
      <Element data={data} update={update} path={path} index="title" isInStream={false} />
      <ElementStream data={data} update={update} path={path} index="stream" />
    </div>
  );
}

export default ListSectionItem;
