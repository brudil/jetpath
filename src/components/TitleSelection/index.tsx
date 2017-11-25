import React from 'react';
import cx from 'classnames';
import TitleSelectionItem from './SelectionItem';

import styles from './TitleSelection.css';
import styled from "react-emotion";
import {css} from "emotion";
import {linkStyles} from "../../Textbox";
import layers from "../../themes/layers";

const Dropdown = styled.div`
  display: ${(props: any) => props.isOpen ? 'block' : 'none' };
  box-shadow: 0 0 6px 0 rgba(30, 30, 30, 0.3);
  background: #ffffff;
  padding: 0.5rem 3rem 0.5rem 0.5rem;
  box-sizing: border-box;
  margin-top: -0.5rem;
  margin-left: -0.5rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${layers.titleSelectionDropdown};
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  user-select: none;
`;

export const choicesStyles = css`
  padding-top: 1em;
`;

export const titleStyles = css`
  font-size: 1.6em;
  font-weight: 400;
  ${linkStyles};
`;


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
    return (
      <Container>
        <h2
          className={cx(titleStyles, styles.currentTitle)}
          onClick={this.handleOpen}
        >
          {this.state.items[this.props.value].title}
        </h2>

        <Dropdown isOpen={this.state.isOpen}>
          <h2 className={cx(titleStyles)} onClick={this.handleClose}>
            {this.state.items[this.props.value].title}
          </h2>
          <ul className={choicesStyles}>
            {this.state.itemsIds.map(id => (
              <TitleSelectionItem
                key={id}
                id={id}
                title={this.state.items[id].title}
                onItemClick={this.handleSelect}
              />
            ))}
          </ul>
        </Dropdown>
      </Container>
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
