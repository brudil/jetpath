import React from 'react';
import DebouncedInput from '../../../DebouncedInput';
import {
  ChangesetApplier,
  ChangesetInstruction,
  ElementPath,
} from '../../../../libs/spectrum2/interfaces';
import Panel, { PanelControl } from '../../ElementPanel/Panel';

interface IProps {
  update: ChangesetApplier;
  data: any; // todo
  path: ElementPath;
}

type InputUpdater = (e: React.KeyboardEvent<HTMLInputElement>) => void;

class PullQuotePanel extends React.Component<IProps> {
  private handleAttribution: InputUpdater;

  constructor(props: IProps) {
    super(props);

    this.handleAttribution = this.handleInput.bind(this, ['attribution', 'text']);
  }

  handleInput(path: ElementPath, e: React.KeyboardEvent<HTMLInputElement>) {
    this.props.update({
      instruction: ChangesetInstruction.UPDATE,
      path: [...this.props.path, ...path],
      value: e.currentTarget.value,
    });
  }

  render() {
    const { data } = this.props;
    const attribution = data.get('attribution');

    return (
      <Panel title="Pull quote">
        <PanelControl title="Attribution">
          <DebouncedInput
            type="text"
            name="attribution"
            id="attribution"
            placeholder="Lincon"
            value={attribution.get('text')}
            onChange={this.handleAttribution}
          />
        </PanelControl>
      </Panel>
    );
  }
}

export default PullQuotePanel;
