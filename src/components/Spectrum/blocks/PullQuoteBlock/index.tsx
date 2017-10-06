import React from 'react';
import DebouncedAutosizeTextarea from '../../../DebouncedAutosizeTextarea';
import { update } from '../../../../libs/spectrum2/changes';
import HeadingIcon from '../../../icons/pull-quote.svg.react';

import styles from './PullQuoteBlock.css';
import {ChangesetApplier, ElementPath} from "../../../../libs/spectrum2/interfaces";

interface IProps {
  data: any,
  path: ElementPath,
  update: ChangesetApplier,
  setFocus: () => void,
}

class PullQuoteBlock extends React.Component<IProps> {
  public static Icon: any;

  constructor(props: IProps) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e: React.KeyboardEvent<HTMLInputElement>) {
    this.props.update(
      update([...this.props.path, 'quote', 'text'], e.currentTarget.value)
    );
  }

  render() {
    const { data, setFocus } = this.props;

    return (
      <div className={styles.root}>
        <DebouncedAutosizeTextarea
          className={styles.textarea}
          placeholder="Pull Quote"
          value={data.getIn(['quote', 'text'])}
          onChange={this.handleInput}
          onFocus={setFocus}
      />
      </div>
    );
  }
}

PullQuoteBlock.Icon = HeadingIcon;

export default PullQuoteBlock;
