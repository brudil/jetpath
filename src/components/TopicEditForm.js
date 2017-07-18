import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-redux-form';
import { SidebarControl } from './Sidebar';
import * as OrgansiationActions from '../ducks/Organisation';

class TopicEditForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmitBound = this.handleSubmit.bind(this);
  }
  handleSubmit(modelData) {
    this.props.dispatch(OrgansiationActions.saveTopic(modelData));
  }

  render() {
    const { model } = this.props;

    return (
      <Form model="topicEdit" onSubmit={this.handleSubmitBound}>
        <SidebarControl title="Topic Name">
          <Field model="topicEdit.title">
            <input type="text" />
          </Field>
        </SidebarControl>
        <SidebarControl title="Slug">
          <Field model="topicEdit.slug">
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

TopicEditForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  model: PropTypes.object.isRequired,
};

export default connect()(TopicEditForm);
