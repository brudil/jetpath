import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as OrgansiationActions from '../../ducks/Organisation';

import { RootState } from '../../types';

interface IProps {
  getAllSections: any; // todo
  isLoading: boolean;
  sections: Array<{ id: number; title: string }>;
  value: any;
  onChange: any;
}

class SectionSelector extends React.Component<IProps, {}> {
  componentDidMount() {
    this.props.getAllSections();
  }

  render() {
    const { isLoading, sections } = this.props;
    const sectionOptions = sections.map(section => ({
      value: section.id,
      label: section.title,
    }));
    return (
      <Select isLoading={isLoading} options={sectionOptions} {...this.props} />
    );
  }
}

export default connect(
  (state: RootState) => ({
    isLoading: state.organisation.loading,
    sections: state.organisation.sectionList.map(
      id => state.entities.sections[id]
    ),
  }),
  {
    getAllSections: OrgansiationActions.getAllSections,
  }
)(SectionSelector);
