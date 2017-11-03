import React from 'react';
import InteractiveSelector from '../../InteractiveSelector';
import { connect } from 'react-redux';
import find from 'lodash/find';
import SegmentedControl from '../../SegmentedControl/index';
import {
  ChangesetApplier,
  ElementPath,
} from '../../../libs/spectrum2/interfaces';
import { update } from '../../../libs/spectrum2/changes';

interface IProps {
  update: ChangesetApplier;
  data: any;
  path: ElementPath;
  interactiveEntities: any;
}

class CanvasSubtype extends React.Component<IProps> {
  private handleSelection: (slug: string) => void;
  private handleViewModeChange: (value: string) => void;

  constructor(props: IProps) {
    super(props);

    this.handleSelection = slug => {
      this.props.update(update([...this.props.path, 'resource', 'slug'], slug));
    };
    this.handleViewModeChange = value => {
      this.props.update(update([...this.props.path, 'viewMode'], value));
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

export default connect(state => ({
  interactiveEntities: state.entities.interactives,
}))(CanvasSubtype);
