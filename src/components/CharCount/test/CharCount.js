import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import CharCount from '../index';

test('CharCount render', t => {
  const wrapper = shallow(<CharCount max={20} value="foo bar" />);
  t.is(
    wrapper.contains(
      <span>
        {13}
      </span>
    ),
    true
  );
});
