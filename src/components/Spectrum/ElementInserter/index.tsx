import React from 'react';
import cx from 'classnames';
import {
  ChangesetApplier, ChangesetInstruction, ElementDefinition,
  ElementPath
} from '../../../libs/spectrum2/interfaces';
import { nameToComponentMap } from '../elementsMap';

import styles from './ElementInserter.css';
import stylesInsertElement from './InsertElement.css';

interface IProps {
  structure: any, // todo
  update: ChangesetApplier,
  position: number,
  path: ElementPath,
}

interface IState {
  isOpen: boolean,
  elements: Array<ElementDefinition>,
  name: string,
}

class ElementInserter extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: false,
      elements: [],
      name: this.getInsertType(),
    };

    this.handleInitialClick = this.handleInitialClick.bind(this);
    this.handleStopPropagation = this.handleStopPropagation.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  getInsertType() {
    return 'element'; // todo
  }

  handleStopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  handleInitialClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const defaultElement = this.props.structure.options.fields[0].options
      .defaultValue;
    const allowed = this.props.structure.options.fields[0].options.elements;

    if (defaultElement) {
      this.handleInsertElement(defaultElement);
      return;
    }

    if (allowed) {
      this.setState({ isOpen: true, elements: allowed });
    }
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  handleInsertElement(elementDef: ElementDefinition) {
    this.props.update({
      instruction: ChangesetInstruction.INSERT,
      path: this.props.path,
      element: elementDef,
      position: this.props.position,
    });
    this.setState({ isOpen: false });
  }

  render() {
    let inner = null;

    if (!this.state.isOpen) {
      inner = (
        <a
          href=""
          className={stylesInsertElement.root}
          onClick={this.handleInitialClick}
          title={`Insert ${this.state.name}`}
        >
          <span className={stylesInsertElement.label}>
            Insert {this.state.name || ''}
          </span>
        </a>
      );
    } else {
      inner = (
        <div className={styles.root}>
          <div className={styles.title}>Insert {this.state.name || ''}</div>
          <ul className={styles.list}>
            {this.state.elements.map(element => {
              const component = nameToComponentMap.get(element.identifier);
              if (component === undefined) {
                console.warn(element.identifier, "isn't in element map");
                return null;
              }
              const Icon = Object.hasOwnProperty.call(component, 'Icon')
                ? component.Icon
                : null;

              return (
                <li
                  className={styles.element}
                  key={element.identifier}
                  onClick={this.handleInsertElement.bind(this, element)}
                >
                  <div className={styles.elementIcon}>
                    <i className={`icon icon-${element.identifier}`}>
                      {Icon !== null ? <Icon /> : null}
                    </i>
                  </div>
                  <div className={styles.elementLabel}>
                    {element.identifier}
                  </div>
                </li>
              );
            })}
            <li
              className={cx(styles.element, styles.element_close)}
              onClick={this.handleClose}
            >
              <div className={styles.elementIcon}>
                <i className="icon icon-cross">
                  <img
                    src={require('icons/cross.svg')}
                    alt="Remove element"
                  />
                </i>
              </div>
              <div className={styles.elementLabel}>Close</div>
            </li>
          </ul>
        </div>
      );
    }

    return (
      <div
        onMouseOut={this.handleStopPropagation}
        onMouseOver={this.handleStopPropagation}
      >
        {inner}
      </div>
    );
  }
}

export default ElementInserter;
