import React from 'react';
import cx from 'classnames';
import style from './Stat.css';

interface IProps {
  subtitle: string;
  loading?: boolean;
  value?: boolean;
  render?: (loading: undefined | boolean, value: any) => any;
}

const render = (loading: undefined | boolean, value: any) =>
  loading ? '0' : value;

function Stat(props: IProps) {
  console.log(props);
  return (
    <div className={style.root}>
      <div className={cx(style.value, { [style.valueLoading]: props.loading })}>
        {props.render
          ? props.render(props.loading, props.value)
          : render(props.loading, props.value)}
      </div>
      <div className={style.subtitle}>{props.subtitle}</div>
    </div>
  );
}

export default Stat;
