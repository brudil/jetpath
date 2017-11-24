import React from 'react';
import Select, {Option} from 'react-select';
import { connect } from 'react-redux';
import styled from 'react-emotion';
import * as InteractivesActions from '../../ducks/Interactives';
import {RootState} from "../../types";
import {Interactive} from "../../ducks/Interactives";

const InteractiveIframe = styled.iframe`
  margin: 1rem 0;
  width: 100%;
  height: 500px;
  opacity: 0.8;
  pointer-events: none;
  box-sizing: border-box;
  border: 1px solid #3e3e3e;
`;

interface IProps {
  loadInteractivesList: typeof InteractivesActions.loadInteractivesList;

  onChange(value: string | null): void;

  value?: Interactive,
  listLoading: boolean;
  interactiveItems: Interactive[];
}

class InteractiveSelector extends React.Component<IProps> {
  private handleSelection: any;

  componentWillMount() {
    this.props.loadInteractivesList({ order: 'created_desc' }, 5);

    this.handleSelection = (value: Option | null) => this.props.onChange(value ? value.value as string: null);
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
          onChange={this.handleSelection}
          value={value ? value.slug : false}
        />

        {value !== undefined ? (
          <div>
            <InteractiveIframe
              src={`https://thedrab.co/interactive-frame/${value.slug}/v${
                value.latest_public_release_number
              }`}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect((state: RootState) => ({
  interactiveItems: state.interactives.list.map(
    id => state.entities.interactives[id]
  ),
  listLoading: state.interactives.loading,
}), {
  loadInteractivesList: InteractivesActions.loadInteractivesList,
})(InteractiveSelector);
