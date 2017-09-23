import React from 'react';
import omit from 'lodash/omit';
import slug from 'slug';
import cx from 'classnames';
import slugify from '../libs/slugify';

function performRemoveStopWords(text: string): string {
  return text;
}

function SlugInput({ onChange, removeStopWords, value, ...props }: { onChange: Function, removeStopWords: boolean, autoValue: string, className: string, value: string }) {
  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    let text = event.currentTarget.value;
    if (removeStopWords) {
      text = performRemoveStopWords(text);
    }
    text = slugify(text);

    onChange(text);
  }

  function handleBlur() {
    const text = slug(value);
    onChange(text);
  }

  return (
    <input
      className={cx(props.className)}
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      {...omit(props, ['autoValue'])}
    />
  );
}

export default SlugInput;
