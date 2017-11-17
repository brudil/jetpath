import React from 'react';
import keyBy from 'lodash/keyBy';
import { sets } from '../../../libs/spectrum2/structure';
import { changeSubtype } from '../../../libs/spectrum2/changes';
import SegmentedControl from '../../SegmentedControl';

import cogIcon from './cog.svg';
import {css} from "emotion";

const prefButtonStyles = css`
  border: 0;
  background: transparent;
  opacity: 0.4;

  &:hover {
    opacity: 0.7;
  }
`;

interface IProps {
  data: any;
  applyChangeset: any;
}

class DocumentPanel extends React.Component<IProps, any> {
  private subtypeMap: { [key: string]: any }; // todo
  private handleChangeSubtype: (subtypeName: string) => void;

  constructor(props: IProps) {
    super(props);

    this.subtypeMap = keyBy(sets.subtypes, subtype => subtype.identifier);

    this.handleChangeSubtype = value => {
      this.props.applyChangeset(changeSubtype(this.subtypeMap[value]));
    };

    this.state = {
      isOpen: false,
    };

    this.handleVisibilityToggle = this.handleVisibilityToggle.bind(this);
  }

  handleVisibilityToggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { isOpen } = this.state;
    return isOpen ? (
      <div className="panel">
        <div className="panel__control">
          <div className="panel__control-name">Document subtype </div>
          <div>
            <em>Changing subtype will destroy all current content</em>
          </div>
          <SegmentedControl
            value={this.props.data.getIn(['content', '_name'])}
            options={['article', 'Article', 'canvas_subtype', 'Canvas']}
            onChange={this.handleChangeSubtype}
          />
        </div>
      </div>
    ) : (
      <button className={prefButtonStyles} onClick={this.handleVisibilityToggle}>
        <img src={cogIcon} alt="Document preferences" width="24" />
      </button>
    );
  }
}

export default DocumentPanel;
