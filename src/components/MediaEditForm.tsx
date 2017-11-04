import React from 'react';
import {Field, reduxForm, SubmitHandler} from 'redux-form';

interface IProps {
  handleSubmit: SubmitHandler
}

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
})(MediaEditForm);
