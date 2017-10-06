import React from 'react';
import {
  ChangesetApplier, ChangesetInstruction, ElementDefinition,
  ElementPath
} from '../../../libs/spectrum2/interfaces';
import * as EditorActions from '../../../ducks/Editor';
import isEqual from 'lodash/isEqual';
import { nameToComponentMap } from '../elementsMap';

import styles from './ElementInserter.css';
import stylesInsertElement from './InsertElement.css';
import {connect} from 'react-redux';

interface IProps {
  structure: any, // todo
  update: ChangesetApplier,
  position: number,
  path: ElementPath,
  focus: any,
  setInsertFocus: any,
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
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    if (
      nextState !== this.state
      || !isEqual(this.props.path, nextProps.path)
      || this.props.position !== nextProps.position
      || this.props.focus !== nextProps.focus // todo: this means every focus change will rerender, focus on if change effects element path given
    ) {
      return true;
    }

    return false;
  }

  getInsertType() {
    return 'element'; // todo
  }

  handleStopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  handleInitialClick(e: React.MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>) {
    e.preventDefault();
    e.stopPropagation();
    const defaultElement = this.props.structure.options.fields[0].options
      .defaultValue;
    const allowed = this.props.structure.options.fields[0].options.elements;

    if (defaultElement) {
      this.handleInsertElement(defaultElement);
      return;
    }

    if (allowed) {
      this.setState({ elements: allowed });
      this.props.setInsertFocus([...this.props.path, this.props.position]);
    }
  }

  handleInsertElement(elementDef: ElementDefinition) {
    this.props.update({
      instruction: ChangesetInstruction.INSERT,
      path: this.props.path,
      element: elementDef,
      position: this.props.position,
    });

  }

  render() {
    let inner = null;

    if (
      !isEqual(this.props.focus.get('focusPath').toJS(), [...this.props.path, this.props.position])
      || this.props.focus.get('focusType') !== 'INSERTER'
    ) {
      inner = (
        <a
          href=""
          className={stylesInsertElement.root}
          onClick={this.handleInitialClick}
          title={`Insert ${this.state.name}`}
          onFocus={this.handleInitialClick}
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
            {this.props.structure.options.fields[0].options.elements.map((element: ElementDefinition) => {
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
                  className={styles.elementListItem}
                >
                  <button
                    className={styles.elementButton}
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
                  </button>
                </li>
              );
            })}
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

export default connect(null, {
  setInsertFocus: EditorActions.setInsertFocus,
})(ElementInserter);
