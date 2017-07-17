import PropTypes from 'prop-types';
import React from 'react';
import SegmentedControl from '../../SegmentedControl';

const pointsSetup = [
  'none',
  'None',
  'alpha',
  'Alpha',
  'numeric',
  'Numeric',
  'roman',
  'Roman',
];

const orderSetup = ['az', 'a-z', 'za', 'z-a'];

class ListSectionPanel extends React.Component {
  handleUpdate(key, value) {
    this.props.update({ command: 'update', key, value });
  }

  render() {
    return (
      <div className="panel">
        <h1 className="panel__title">List section</h1>
        <div className="panel__control">
          <div className="panel__control-name">Item Points</div>
          <SegmentedControl
            value={this.props.data.points}
            options={pointsSetup}
            onChange={this.handleUpdate.bind(this, 'points')}
          />
        </div>
        <div className="panel__control">
          <div className="panel__control-name">Points Order</div>
          <SegmentedControl
            value={this.props.data.order}
            options={orderSetup}
            onChange={this.handleUpdate.bind(this, 'order')}
          />
        </div>
      </div>
    );
  }
}

ListSectionPanel.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
};

export default ListSectionPanel;
