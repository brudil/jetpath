import React from 'react';
import DebouncedAutosizeTextarea from '../../../DebouncedAutosizeTextarea';
import { update } from '../../../../libs/spectrum2/changes';
import HeadingIcon from '../../../icons/pull-quote.svg.react';
import {
  ChangesetApplier,
  ElementPath,
} from '../../../../libs/spectrum2/interfaces';
import PullQuotePanel from "./Panel";
import styled from "react-emotion";

const Container = styled.div`
  &:before {
    content: "“";
    display: block;
    position: absolute;
    left: 0;
    font-size: 4rem;
    font-family: Georgia, serif;
    font-style: italic;
  }
`;

const PullQuoteInput = styled(DebouncedAutosizeTextarea)`
  border: 0;
  font-size: 1.65rem;
  font-family: Georgia, serif;
  font-style: italic;
  background: transparent;
  outline: 0;
  box-sizing: border-box;
  text-align: center;
  padding-left: 4rem;
  padding-right: 4rem;

  &:focus {
    box-shadow: 0 0 2px rgba(50, 50, 50,  0.1);
  }
`;


interface IProps {
  data: any;
  path: ElementPath;
  update: ChangesetApplier;
  setFocus: () => void;
}

class PullQuoteBlock extends React.Component<IProps> {
  public static panel: any;
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
      <Container>
        <PullQuoteInput
          placeholder="Pull Quote"
          value={data.getIn(['quote', 'text'])}
          onChange={this.handleInput}
          onFocus={setFocus}
        />
      </Container>
    );
  }
}

PullQuoteBlock.Icon = HeadingIcon;
PullQuoteBlock.panel = PullQuotePanel;

export default PullQuoteBlock;
