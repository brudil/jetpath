import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as OrgansiationActions from '../../ducks/Organisation';

// eslint-disable-next-line
import 'style-loader!css-loader!postcss-loader!react-select/dist/react-select.css';

class SectionSelector extends React.Component {
  componentDidMount() {
    this.props.dispatch(OrgansiationActions.getAllSections());
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

SectionSelector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({
  isLoading: state.organisation.loading,
  sections: state.organisation.sectionList.map(
    id => state.entities.sections[id]
  ),
}))(SectionSelector);
