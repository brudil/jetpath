import React from 'react';
import cx from 'classnames';
import TitleSelectionItem from './SelectionItem';

import styles from './TitleSelection.css';

interface IProps {
  className?: string;
  onSelection(value: any): void;
  children: any;
  value: string;
}

interface Items {
  [name: string]: {
    title: string;
    id: any;
  };
}

interface IState {
  items: Items;
  itemsIds: number[];
  isOpen: boolean;
}

class TitleSelection extends React.Component<IProps, IState> {
  private handleOpen: any;
  private handleClose: any;

  constructor(props: IProps) {
    super(props);

    const items: Items = {};
    const itemsIds: number[] = [];
    props.children.forEach((child: any) => {
      items[child.props.name] = {
        title: child.props.children,
        id: child.props.name,
      };
      itemsIds.push(child.props.name);
    });

    this.state = {
      items,
      itemsIds,
      isOpen: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleOpen = this.handleDisplayVisibility.bind(this, true);
    this.handleClose = this.handleDisplayVisibility.bind(this, false);
  }

  handleSelect(selectedId: any) {
    const value = this.props.value;
    if (value !== selectedId) {
      this.setState({ isOpen: false });
      this.props.onSelection(selectedId);
    } else {
      this.setState({ isOpen: false });
    }
  }

  handleDisplayVisibility(open: boolean) {
    this.setState({ isOpen: open });
  }

  render() {
    const rootClasses = cx(this.props.className, {
      [styles.root]: true,
      [styles.root_active]: this.state.isOpen,
    });

    return (
      <div className={rootClasses}>
        <h2
          className={cx(styles.title, styles.currentTitle, 'link')}
          onClick={this.handleOpen}
        >
          {this.state.items[this.props.value].title}
        </h2>

        <div className={styles.dropdown}>
          <h2 className={cx(styles.title, 'link')} onClick={this.handleClose}>
            {this.state.items[this.props.value].title}
          </h2>
          <ul className={styles.choices}>
            {this.state.itemsIds.map(id => (
              <TitleSelectionItem
                key={id}
                id={id}
                title={this.state.items[id].title}
                onItemClick={this.handleSelect}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export { TitleSelection };

interface SelectionProps {
  name: any;
}

export class SelectionItem extends React.Component<
  SelectionProps,
  { value: any }
> {
  constructor(props: SelectionProps) {
    super(props);
    this.state = {
      value: this.props.name,
    };
  }
}
