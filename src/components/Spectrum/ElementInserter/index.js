import PropTypes from 'prop-types';
import React from 'react';
import has from 'lodash/has';
import cx from 'classnames';
import { ChangesetInstruction } from '../../../libs/spectrum2/interfaces'
import * as SpectrumPropTypes from '../SpectrumPropTypes';
import { nameToComponentMap } from '../elementsMap';

import styles from './ElementInserter.css';
import stylesInsertElement from './InsertElement.css';

class ElementInserter extends React.Component {
  constructor(props) {
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
    return 'element';
  }

  handleStopPropagation(e) {
    e.stopPropagation();
  }

  handleInitialClick(e) {
    e.preventDefault();
    const defaultElement = this.props.structure.options.fields[0].options.defaultValue;
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

  handleInsertElement(elementDef) {
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
          <div className={styles.title}>
            Insert {this.state.name || ''}
          </div>
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
                  key={element._name}
                  onClick={this.handleInsertElement.bind(this, element)}
                >
                  <div className={styles.elementIcon}>
                    <i className={`icon icon-${element.elementName}`}>
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
                    // eslint-disable-next-line
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

ElementInserter.propTypes = {
  structure: PropTypes.object.isRequired,
  update: PropTypes.func.isRequired,
  position: PropTypes.number.isRequired,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default ElementInserter;
