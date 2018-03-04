import React from 'react';
import { Form, Field } from 'react-final-form';
import {Input} from "../Textbox";

interface IProps {
  onSubmit: any; // SubmitHandler for internal redux form, external is something else?
  initialValues: any;
}

let MediaEditForm = (props: IProps) => {
  console.log(props);
  return (
    <Form onSubmit={props.onSubmit} initialValues={props.initialValues} render={({ handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <Field name="creditTitle">
          {({ input }) => (
            <div>
              <label htmlFor="creditTitle">Credit title</label>
              <Input {...input} id="creditTitle" type="text" />
            </div>
          )}
        </Field>

        <Field name="creditUrl">
          {({ input }) => (
            <div>
              <label htmlFor="creditUrl">Credit URL</label>
              <Input {...input} id="creditUrl" type="text" />
            </div>
          )}
        </Field>
        <button type="submit">Save</button>
      </form>
    )} />
  );
};

export default MediaEditForm;
