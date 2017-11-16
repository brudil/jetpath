import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as InteractivesActions from '../../ducks/Interactives';

const InteractiveIframe = styled.iframe`
  margin: 1rem 0;
  width: 100%;
  height: 500px;
  opacity: 0.8;
  pointer-events: none;
  box-sizing: border-box;
  border: 1px solid #3e3e3e;
`;

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
      <div>
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
            <InteractiveIframe
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
