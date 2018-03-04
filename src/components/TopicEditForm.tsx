import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-redux-form';
import { SidebarControl } from './Sidebar';
import * as OrgansiationActions from '../ducks/Organisation';
import {Input} from "../Textbox";

interface IProps {
  saveTopic: typeof OrgansiationActions.saveTopic;
  onSubmit: any;
  model: any;
}

class TopicEditForm extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(modelData: any) {
    this.props.saveTopic(modelData);
  }

  render() {
    const { model } = this.props;

    return (
      <Form model="topicEdit" onSubmit={this.handleSubmit} hideNativeErrors={false}>
        <SidebarControl title="Topic Name">
          <Field model="topicEdit.title">
            <Input type="text" />
          </Field>
        </SidebarControl>
        <SidebarControl title="Slug">
          <Field model="topicEdit.slug">
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
  saveTopic: OrgansiationActions.saveTopic,
})(TopicEditForm);
