import React from 'react';
import Stat from './Stat';

import style from './BigStats.css';

interface IProps {
  data: null | any[];
  children: any;
}

function BigStats(props: IProps) {
  return (
    <div className={style.root}>
      {props.children.map((child: any, index: number) =>
        React.cloneElement(child, {
          loading: props.data === null,
          value: props.data === null ? null : props.data[index],
        })
      )}
    </div>
  );
}

export { Stat };

export default BigStats;
