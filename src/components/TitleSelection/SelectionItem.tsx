import React from 'react';
import cx from 'classnames';

import styles from './TitleSelection.css';
import {titleStyles} from "./index";

interface IProps {
  title: string;
  id: any;
  onItemClick(value: any): void;
}

class SelectionItem extends React.Component<IProps> {
  private handleClick: any;

  constructor(props: IProps) {
    super(props);

    this.handleClick = this.props.onItemClick.bind(this, this.props.id);
  }

  render() {
    const { title } = this.props;
    return (
      <li
        className={cx(titleStyles, styles.choice, 'link')}
        onClick={this.handleClick}
      >
        {title}
      </li>
    );
  }
}

export default SelectionItem;
