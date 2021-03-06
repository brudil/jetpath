import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-redux-form';
import { SidebarControl } from './Sidebar';
import * as OrgansiationActions from '../ducks/Organisation';
import {Input} from "../Textbox";

interface IProps {
  model: Object;
  saveSection: any; // todo
  onSubmit: any; // todo
}

class SectionEditForm extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(modelData: Object) {
    this.props.saveSection(modelData);
  }

  render() {
    const { model } = this.props;
    return (
      <Form model="sectionEdit" onSubmit={this.handleSubmit} hideNativeErrors={false}>
        <SidebarControl title="Section Title">
          <Field model="sectionEdit.title">
            <Input type="text" placeholder="Title" />
          </Field>
        </SidebarControl>
        <SidebarControl title="Slug">
          <Field model="sectionEdit.slug">
            <Input type="text" />
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

export default connect(null, {
  saveSection: OrgansiationActions.saveSection,
})(SectionEditForm);
