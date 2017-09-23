import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as OrgansiationActions from '../../ducks/Organisation';

// eslint-disable-next-line
import 'style-loader!css-loader!postcss-loader!react-select/dist/react-select.css';

interface IProps {
  getAllSections: OrgansiationActions.getAllSections,
  isLoading: boolean,
  sections: Array<{ id: number, title: string }>
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
    })) as any;
    return (
      <Select isLoading={isLoading} options={sectionOptions} />
    );
  }
}

export default connect((state: {
  organisation: {
    loading: boolean,
    sectionList: Array<number>,
  },
  entities: {
    sections: {[key: number]: Object}
  }
}) => ({
  isLoading: state.organisation.loading,
  sections: state.organisation.sectionList.map(
    id => state.entities.sections[id]
  ),
}), {
  getAllSections: OrgansiationActions.getAllSections,
})(SectionSelector);
