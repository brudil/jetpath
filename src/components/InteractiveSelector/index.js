import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';
import * as InteractivesActions from '../../ducks/Interactives';

import styles from './InteractiveSelector.css';

class InteractiveSelector extends React.Component {
  componentWillMount() {
    this.props.dispatch(
      InteractivesActions.loadInteractivesList({ order: 'created_desc' }, 5)
    );

    this.handleSelection = value => this.props.onChange(value.value);
  }

  render() {
    const { value, listLoading, interactiveItems } = this.props;
    return (
      <div className={styles.root}>
        <Select
          isLoading={listLoading}
          options={interactiveItems.map(interactiveItem => ({
            value: interactiveItem.slug,
            label: interactiveItem.slug,
          }))}
          onInputChange={this.handleInputChangeBound}
          onChange={this.handleSelection}
          value={value ? value.slug : null}
        />

        {value !== undefined ? (
          <div>
            <iframe
              className={styles.interactiveFrame}
              src={`https://thedrab.co/interactive-frame/${value.slug}/v${value.latest_public_release_number}`}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

InteractiveSelector.propTypes = {};

export default connect(state => ({
  interactiveItems: state.interactives.list.map(
    id => state.entities.interactives[id]
  ),
  listLoading: state.interactives.loading,
}))(InteractiveSelector);
