import React from '../../../vendors/react';
import {shallow} from 'enzyme';
import DonePage from './done';

describe('DonePage', () => {
  it('renders', () => {
    const wrapper = shallow(<DonePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
