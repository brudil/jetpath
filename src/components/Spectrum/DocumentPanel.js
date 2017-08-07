import PropTypes from 'prop-types';
import React from 'react';
import keyBy from 'lodash/keyBy';
import { subtypes } from '@brudil/spectrum';
import SegmentedControl from '../SegmentedControl';

class DocumentPanel extends React.Component {
  constructor(props) {
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

  handleUpdate(key, value) {
    this.props.update({ command: 'update', key, value });
  }

  handleVisibilityToggle(force = null) {
    this.setState({ isOpen: force === null ? !this.state.isOpen : force });
  }

  render() {
    console.log(this.props.data);
    const { isOpen } = this.state;
    return isOpen
      ? <div className="panel">
          <div className="panel__control">
            <div className="panel__control-name">Document subtype </div>
            <div>
              <em>Changing subtype will destory all current content</em>
            </div>
            <SegmentedControl
              value={this.props.data.getIn(['content', '_name'])}
              options={['article', 'Article', 'canvas_subtype', 'Canvas']}
              onChange={this.handleChangeSubtype}
            />
          </div>
        </div>
      : <button onClick={this.handleVisibilityToggle}>Document prefs</button>;
  }
}

DocumentPanel.propTypes = {
  changeSubtype: PropTypes.func,
  data: PropTypes.object,
};

export default DocumentPanel;
