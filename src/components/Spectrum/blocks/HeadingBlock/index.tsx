import React from 'react';
import {
  ChangesetApplier, ChangesetInstruction,
  ElementPath
} from '../../../../libs/spectrum2/interfaces';
import DebouncedAutosizeTextarea from '../../../DebouncedAutosizeTextarea';
import HeadingIcon from '../../../icons/heading.svg.react';

import styles from './HeadingBlock.css';

interface IProps {
  update: ChangesetApplier,
  data: any, // todo
  path: ElementPath,
  setFocus: () => void
}

class HeadingBlock extends React.Component<IProps> {
  static Icon: any;
  constructor(props: IProps) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    this.props.update({
      instruction: ChangesetInstruction.UPDATE,
      path: [...this.props.path, 'text', 'text'],
      value: e.currentTarget.value,
    });
  }

  render() {
    const { data, setFocus } = this.props;

    return (
      <div className={styles.root}>
        <DebouncedAutosizeTextarea
          className={styles.textarea}
          placeholder="Heading"
          value={data.getIn(['text', 'text'])}
          onChange={this.handleInput}
          onFocus={setFocus}
        />
      </div>
    );
  }
}

HeadingBlock.Icon = HeadingIcon;

export default HeadingBlock;
