import React from 'react';
import ElementStream from '../ElementStream';
import ListSectionPanel from './ListSectionPanel';
import ListIcon from '../../icons/list.svg.react';

import styles from './Section.css';
import {ChangesetApplier, ElementPath} from "../../../libs/spectrum2/interfaces";
import {SpectrumRenderElement} from "../interfaces";

interface IProps {
  path: ElementPath,
  data: any,
  update: ChangesetApplier
}

const ListSection: SpectrumRenderElement<IProps> = (props: IProps) => {
  const { data, path, update } = props;

  return (
    <div className={styles.root}>
      <header className={styles.header}>List Section</header>
      <ElementStream
        className={styles.stream}
        data={data}
        path={path}
        update={update}
        index="stream"
      />
    </div>
  );
};

ListSection.panel = ListSectionPanel;
ListSection.Icon = ListIcon;

export default ListSection;
