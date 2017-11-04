import React from 'react';
import {
  ChangesetApplier,
  ChangesetInstruction,
  ElementPath,
} from '../../../../libs/spectrum2/interfaces';
import Panel, { PanelControl } from '../../ElementPanel/Panel';
import {SegmentedControl} from "../../../SegmentedControl/index";

interface IProps {
  update: ChangesetApplier;
  data: any; // todo
  path: ElementPath;
}

class CanvasPanel extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleContainerChange = this.handleContainerChange.bind(this);
  }

  handleInput(path: ElementPath, e: React.KeyboardEvent<HTMLInputElement>) {
    this.props.update({
      instruction: ChangesetInstruction.UPDATE,
      path: [...this.props.path, ...path],
      value: e.currentTarget.value,
    });
  }

  handleContainerChange(value: string) {
    this.props.update({
      instruction: ChangesetInstruction.UPDATE,
      path: [...this.props.path, 'container'],
      value
    });
  }

  render() {
    const { data } = this.props;
    const container = data.get('container');

    return (
      <Panel title="Canvas">
        <PanelControl title="Sizing">
          <SegmentedControl
            value={container}
            options={['CONTENT','Content', 'CONTAINER', 'Container', 'BLEED', 'Bleed']}
            onChange={this.handleContainerChange}
          />
        </PanelControl>
      </Panel>
    );
  }
}

export default CanvasPanel;
