import React from 'react';
import { shallow } from 'enzyme';
import CharCount from '../index';

test('CharCount render', () => {
  const wrapper = shallow(<CharCount max={20} value="foo bar" />);
  expect(
    wrapper.contains(
      <span>
        {13}
      </span>
    )).toBeTruthy();
});
