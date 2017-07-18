import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-redux-form';
import { SidebarControl } from './Sidebar';
import * as OrgansiationActions from '../ducks/Organisation';

class SectionEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmitBound = this.handleSubmit.bind(this);
  }

  handleSubmit(modelData) {
    this.props.dispatch(OrgansiationActions.saveSection(modelData));
  }

  render() {
    const { model } = this.props;
    return (
      <Form model="sectionEdit" onSubmit={this.handleSubmitBound}>
        <SidebarControl title="Section Title">
          <Field model="sectionEdit.title">
            <input type="text" placeholder="Title" />
          </Field>
        </SidebarControl>
        <SidebarControl title="Slug">
          <Field model="sectionEdit.slug">
            <input type="text" />
          </Field>
        </SidebarControl>
        <input
          type="submit"
          value={{}.hasOwnProperty.call(model, 'id') ? 'Save' : 'Create'}
        />
      </Form>
    );
  }
}

SectionEditForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
};

export default connect()(SectionEditForm);
