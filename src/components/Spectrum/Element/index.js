import PropTypes from 'prop-types';
import React from 'react';
import isEqual from 'lodash/isEqual';
import { nameToComponentMap } from '../elementsMap';
import * as SpectrumPropTypes from '../SpectrumPropTypes';
import ElementPanel from '../ElementPanel';

import styles from './Element.css';

class Element extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
    };

    this.handleMouseOverBound = this.handleMouseOver.bind(this);
    this.handleMouseOutBound = this.handleMouseOut.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.show !== nextState.show || !isEqual(this.props, nextProps)
    );
  }

  handleMouseOver(e) {
    e.stopPropagation();
    if (this.state.show !== true) {
      this.setState({ show: true });
    }
  }

  handleMouseOut(e) {
    e.stopPropagation();
    if (this.state.show !== false) {
      this.setState({ show: false });
    }
  }

  render() {
    const { update, path, index, position, isInStream, data } = this.props;

    const element = data.get(index);
    const elementName = element.get('_name');
    if (element === null) {
      return <p>Element is empty.</p>;
    }

    const ElementChild = nameToComponentMap.get(elementName);
    const elementPath = [...path, index];
    const el = ElementChild
      ? React.createElement(ElementChild, {
          data: element,
          path: elementPath,
          update,
          index,
        })
      : <pre>
          "{elementName}" not found!
        </pre>;

    const hasCustomPanel =
      ElementChild !== undefined &&
      Object.hasOwnProperty.call(ElementChild, 'panel');

    return (
      <div
        className={styles.root}
        onMouseOut={this.handleMouseOutBound}
        onMouseOver={this.handleMouseOverBound}
      >
        {el}
        <ElementPanel
          isHovering={this.state.show}
          update={update}
          path={elementPath}
          customElementPanel={hasCustomPanel ? ElementChild.panel : null}
          data={element}
          streamIndex={position}
          isInStream={isInStream}
        />
      </div>
    );
  }
}

Element.propTypes = {
  update: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.shape({
      setupStructure: PropTypes.object,
    }).isRequired,
    PropTypes.array.isRequired,
  ]),
  position: PropTypes.array,
  isInStream: PropTypes.bool,
  index: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default Element;
