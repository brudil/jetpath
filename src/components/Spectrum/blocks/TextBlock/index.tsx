import React from 'react';
import DebouncedAutosizeTextarea from '../../../DebouncedAutosizeTextarea';
import TextIcon from '../../../icons/text.svg.react';

import styles from './TextBlock.css';
import { Changeset, ElementPath } from '../../../../libs/spectrum2/interfaces';
import { update } from '../../../../libs/spectrum2/changes';

interface IProps {
  update: (changeset: Changeset) => void;
  data: any; // todo
  path: ElementPath;
  setFocus: () => void;
}

class TextBlock extends React.Component<IProps> {
  static Icon: any;
  constructor(props: IProps) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    const { path } = this.props;
    this.props.update(update([...path, 'text', 'text'], e.currentTarget.value));
  }

  render() {
    const { data, setFocus } = this.props;

    return (
      <div className={styles.root}>
        <DebouncedAutosizeTextarea
          className={styles.textarea}
          placeholder="Markdown supported text"
          value={data.getIn(['text', 'text'])}
          onChange={this.handleInput}
          onFocus={setFocus}
        />
      </div>
    );
  }
}

TextBlock.Icon = TextIcon;

export default TextBlock;
