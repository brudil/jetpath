import React from 'react';
import SegmentedControl from '../../SegmentedControl';
import {ChangesetApplier, ElementPath} from "../../../libs/spectrum2/interfaces";
import {update} from "../../../libs/spectrum2/changes";
import Panel, { PanelControl } from "../ElementPanel/Panel";

const pointsSetup = [
  null,
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
      <Panel title="List section">
        <PanelControl title="Style">
          <SegmentedControl
            value={this.props.data.get('points')}
            options={pointsSetup}
            onChange={this.handleUpdate.bind(this, 'points')}
          />
        </PanelControl>
        <PanelControl title="Order">
          <SegmentedControl
            value={this.props.data.get('order')}
            options={orderSetup}
            onChange={this.handleUpdate.bind(this, 'order')}
          />
        </PanelControl>
      </Panel>
    );
  }
}

export default ListSectionPanel;
