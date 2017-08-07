import PropTypes from 'prop-types';
import React from 'react';
import * as SpectrumPropTypes from '../SpectrumPropTypes';
import InteractiveSelector from '../../InteractiveSelector';
import ElementStream from '../ElementStream';
import { connect } from 'react-redux';
import find from 'lodash/find';
import SegmentedControl from '../../SegmentedControl/index';

class CanvasSubtype extends React.Component {
  constructor(props) {
    super(props);

    this.handleSelection = slug => {
      this.props.update({
        command: 'update',
        path: [...this.props.path, 'resource', 'slug'],
        value: slug,
      });
    };
    this.handleViewModeChange = value => {
      this.props.update({
        command: 'update',
        path: [...this.props.path, 'viewMode'],
        value,
      });
    };
  }

  render() {
    const { interactiveEntities, data } = this.props;
    const slug = data.getIn(['resource', 'slug']);
    const item = find(interactiveEntities, { slug });

    return (
      <div>
        <SegmentedControl
          options={[
            'CONTENT',
            'Content',
            'CONTAINER',
            'Container',
            'CANVAS',
            'Canvas',
          ]}
          value={data.get('viewMode')}
          onChange={this.handleViewModeChange}
        />
        <InteractiveSelector value={item} onChange={this.handleSelection} />
      </div>
    );
  }
}

CanvasSubtype.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default connect(state => ({
  interactiveEntities: state.entities.interactives,
}))(CanvasSubtype);
