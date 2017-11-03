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

class ImageBlockPanel extends React.Component<IProps> {
  private handleCaption: InputUpdater;
  private handleTitle: InputUpdater;
  private handleAlt: InputUpdater;

  constructor(props: IProps) {
    super(props);

    this.handleCaption = this.handleInput.bind(this, ['caption', 'text']);
    this.handleTitle = this.handleInput.bind(this, ['title', 'text']);
    this.handleAlt = this.handleInput.bind(this, ['alt', 'text']);
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
    const caption = data.get('caption');
    const title = data.get('title');
    const alt = data.get('alt');

    return (
      <Panel title="Image">
        <PanelControl title="Caption">
          <DebouncedInput
            type="text"
            name="caption"
            id="caption"
            placeholder="Everest 2013"
            value={caption.get('text')}
            onChange={this.handleCaption}
          />
        </PanelControl>
        <PanelControl title="Tool tip text">
          <DebouncedInput
            type="text"
            name="titletext"
            id="titletext"
            placeholder="Cor, blimey"
            value={title.get('text')}
            onChange={this.handleTitle}
          />
        </PanelControl>
        <PanelControl title="Alt text">
          <DebouncedInput
            type="text"
            name="alttext"
            id="alttext"
            placeholder="Everest at sunset"
            value={alt.get('text')}
            onChange={this.handleAlt}
          />
        </PanelControl>
      </Panel>
    );
  }
}

export default ImageBlockPanel;
