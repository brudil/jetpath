import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import InteractiveSelector from '../../../InteractiveSelector';
import { update } from '../../../../libs/spectrum2/changes';
import CanvasIcon from '../../../icons/canvas.svg.react';

import styles from './CanvasBlock.css';
import { Changeset, ElementPath } from '../../../../libs/spectrum2/interfaces';
import CanvasPanel from "./Panel";

interface IProps {
  update: (changeset: Changeset) => void;
  data: any;
  interactiveEntities: any;
  listLoading: boolean;
  interactiveItems: Object;
  path: ElementPath;
}

class CanvasBlock extends React.Component<IProps> {
  public static panel: any;
  public static Icon: any;

  constructor(props: IProps) {
    super(props);

    this.handleSelection = this.handleSelection.bind(this);
  }

  handleSelection(slug: string) {
    this.props.update(update([...this.props.path, 'resource', 'slug'], slug));
  }

  render() {
    const { interactiveEntities, data } = this.props;
    const slug = data.getIn(['resource', 'slug']);
    const item = find(interactiveEntities, { slug });

    return (
      <div className={styles.root}>
        <InteractiveSelector value={item} onChange={this.handleSelection} />
      </div>
    );
  }
}

CanvasBlock.Icon = CanvasIcon;
CanvasBlock.panel = CanvasPanel;

export default connect(state => ({
  interactiveEntities: state.entities.interactives,
}))(CanvasBlock);
