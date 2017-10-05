import React from 'react';
import SegmentedControl from '../../SegmentedControl';
import {ChangesetApplier, ElementPath} from "../../../libs/spectrum2/interfaces";
import {update} from "../../../libs/spectrum2/changes";

const pointsSetup = [
  'none',
  'None',
  'alpha',
  'Alpha',
  'numeric',
  'Numeric',
  'roman',
  'Roman',
];

const orderSetup = ['az', 'a-z', 'za', 'z-a'];

interface IProps {
  path: ElementPath,
  data: any,
  update: ChangesetApplier
}

class ListSectionPanel extends React.Component<IProps> {
  handleUpdate(key: string, value: string) {
    this.props.update(update([...this.props.path, key], value));
  }

  render() {
    return (
      <div className="panel">
        <h1 className="panel__title">List section</h1>
        <div className="panel__control">
          <div className="panel__control-name">Item Points</div>
          <SegmentedControl
            value={this.props.data.points}
            options={pointsSetup}
            onChange={this.handleUpdate.bind(this, 'points')}
          />
        </div>
        <div className="panel__control">
          <div className="panel__control-name">Points Order</div>
          <SegmentedControl
            value={this.props.data.order}
            options={orderSetup}
            onChange={this.handleUpdate.bind(this, 'order')}
          />
        </div>
      </div>
    );
  }
}

export default ListSectionPanel;
