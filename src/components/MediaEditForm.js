import React from 'react';
import { Field, reduxForm } from 'redux-form';

let MediaEditForm = props => {
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
