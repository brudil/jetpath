import React from 'react';
import { nameToComponentMap } from '../elementsMap';
import ElementPanel from '../ElementPanel';

import styles from './Element.css';
import {ElementIndex, ElementPath} from "../../../libs/spectrum2/interfaces";
import isEqual from "lodash/isEqual";

interface IProps {
  update: (key: any) => void,
  position?: Array<any>, // todo
  path: ElementPath,
  isInStream: boolean,
  index: ElementIndex,
  data: any,
}

interface IState {
  show: boolean,
}

class Element extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      show: false,
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (this.state.show !== true) {
      this.setState({ show: true });
    }
  }

  handleMouseOut(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (this.state.show !== false) {
      this.setState({ show: false });
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    const shouldUpdate = !isEqual(this.props.position, nextProps.position) ||
      !isEqual(this.props.path, nextProps.path) ||
      this.props.index !== nextProps.index ||
      this.props.data.get(this.props.index) !== nextProps.data.get(this.props.index) ||
      this.state.show !== nextState.show;

    return shouldUpdate;
  }

  render() {
    const { update, path, index, position, isInStream, data } = this.props;

    const element = data.get(index);
    if (element === null || element === undefined) {
      return <p>Element is empty.</p>;
    }

    const elementName = element.get('_name');

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
        onMouseOut={this.handleMouseOut}
        onMouseOver={this.handleMouseOver}
      >
        {el}
        {position ? <ElementPanel
          isHovering={this.state.show}
          update={update}
          path={elementPath}
          customElementPanel={hasCustomPanel ? ElementChild.panel : null}
          data={element}
          streamIndex={position}
          isInStream={isInStream}
        /> : null}
      </div>
    );
  }
}

export default Element;
