import React from 'react';
import ElementStream from '../ElementStream';
import FreeformIcon from '../../icons/freeform.svg.react';

import styles from './Section.css';
import {ChangesetApplier, ElementPath} from "../../../libs/spectrum2/interfaces";
import {SpectrumRenderElement} from "../interfaces";

interface IProps {
  path: ElementPath,
  data: any,
  update: ChangesetApplier,
  focus: any,
}

const FreeformSection: SpectrumRenderElement<IProps> = (props: IProps) => {
  const { data, path, update, focus } = props;
  return (
    <div className={styles.root}>
      <header className={styles.header}>Freeform Section</header>
      <ElementStream
        className={styles.stream}
        data={data}
        path={path}
        update={update}
        index="stream"
        focus={focus}
      />
    </div>
  );
} ;

FreeformSection.Icon = FreeformIcon;

export default FreeformSection;
