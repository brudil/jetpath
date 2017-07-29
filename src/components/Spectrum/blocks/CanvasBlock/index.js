import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import find from 'lodash/find';
import * as ModalManagerActions from '../../../../ducks/Modal';
import * as SpectrumPropTypes from '../../SpectrumPropTypes';
import InteractivesSelectModal from '../../../InteractivesSelectModal';
import Panel from './Panel';
import Button from '../../../Button';
import CanvasIcon from '../../../icons/canvas.svg.react';

import styles from './CanvasBlock.css';

class CanvasBlock extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputBound = this.handleInput.bind(this);
    this.handleOpenLibraryBound = this.handleOpenLibrary.bind(this);
    this.handleSelectionBound = this.handleSelection.bind(this);
  }

  handleInput(e) {
    this.props.update({
      command: 'update',
      path: [...this.props.path, 'text', 'data'],
      value: e.target.value,
    });
  }

  handleOpenLibrary() {
    this.props.dispatch(ModalManagerActions.open(this._selectModal));
  }

  handleSelection(slug) {
    this.props.dispatch(ModalManagerActions.close(this._selectModal));
    this.props.update({
      command: 'update',
      path: [...this.props.path, 'resource', 'slug'],
      value: slug,
    });
  }

  render() {
    const { interactiveEntities, data } = this.props;
    const slug = data.getIn(['resource', 'slug']);
    const item = find(interactiveEntities, { slug });

    return (
      <div className={styles.root}>
        <Button
          onClick={this.handleOpenLibraryBound}
          text={'Choose an interactive'}
        />
        {item !== undefined
          ? <h1>
              {item.slug} selected
            </h1>
          : null}

        <InteractivesSelectModal
          ref={el => {
            this._selectModal = el;
          }}
          onSelect={this.handleSelectionBound}
        />
      </div>
    );
  }
}

CanvasBlock.panel = Panel;
CanvasBlock.Icon = CanvasIcon;

CanvasBlock.propTypes = {
  update: PropTypes.func,
  data: PropTypes.object,
  interactiveEntities: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  path: SpectrumPropTypes.elementPath.isRequired,
};

export default connect(state => ({
  interactiveEntities: state.entities.interactives,
}))(CanvasBlock);
