import React from 'react';
import keyBy from 'lodash/keyBy';
import { subtypes } from '@brudil/spectrum';
import SegmentedControl from '../../SegmentedControl';

import cogIcon from './cog.svg';

import styles from './DocumentPanel.css';

interface IProps {
  data: any,
  changeSubtype: any
}

class DocumentPanel extends React.Component<IProps, any> {
  private subtypeMap: {[key: string]: any}; // todo
  private handleChangeSubtype: (subtypeName: string) => void;

  constructor(props: IProps) {
    super(props);

    this.subtypeMap = keyBy(subtypes.sets.all, subtype => subtype._name);

    this.handleChangeSubtype = value => {
      this.props.changeSubtype(new this.subtypeMap[value]());
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
    console.log(this.props.data);
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
      <button className={styles.button} onClick={this.handleVisibilityToggle}><img src={cogIcon} alt="Document preferences" width="24" /></button>
    );
  }
}

export default DocumentPanel;
