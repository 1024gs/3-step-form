import React from '../../../vendors/react';
import {shallow} from 'enzyme';
import Navbar from './navbar';

describe('Navbar', () => {
  it('renders', () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
