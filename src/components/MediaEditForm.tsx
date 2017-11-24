import React from 'react';
import { Field as FieldUnstyled, reduxForm } from 'redux-form';
import {Input} from "../Textbox";

interface IProps {
  handleSubmit: any; // SubmitHandler for internal redux form, external is something else?
}

const Field = Input.withComponent(FieldUnstyled as any);

let MediaEditForm = (props: IProps) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="creditTitle">Credit title</label>
        <Field name="creditTitle" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="creditUrl">Credit URL</label>
        <Field name="creditUrl" component="input" type="text" />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default reduxForm({
  form: 'media',
})(MediaEditForm) as any;
